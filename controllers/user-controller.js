import User from '../models/User'
import bcrypt from 'bcryptjs'

export const signup = async (req, res) => {
  const { name, email, password } = req.body
  let existingUser

  try {
    existingUser = await User.findOne({ email })
  } catch (err) {
    return res.status(500).json({message: 'Internal Server Error'})
  }

  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' })
  }

  const hashedPassword = bcrypt.hashSync(password)

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  })

  try {
    await newUser.save()
  } catch (err) {
    return res.status(500).json({message: 'Internal Server Error'})
  }

  return res
    .status(201)
    .json({
      message: 'Successfully added to the database',
      credentials: newUser,
    })
}

export const login = async (req, res) => {
  const { email, password } = req.body
  let existingUser

  try {
    existingUser = await User.findOne({ email })
  } catch (err) {
    return res.status(500).json({message: 'Internal Server Error'})
  }

  if (!existingUser) {
    return res.status(400).json({ message: 'Invalid email address' })
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: 'Invalid password' })
  }

  return res
    .status(200)
    .json({ message: 'Successfully logged in', credentials: existingUser })
}
