import Resume from '../models/Resume.js'
import moment from 'moment'
export const getAllResumes = async (req, res) => {
  let resumes

  try {
    resumes = await Resume.find({})
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }

  if (!resumes) {
    return res.status(200).json({ message: 'No resumes created yet' })
  }

  return res.status(200).json({ resumes })
}

export const getSingleResume = async (req, res) => {
  const { resumeId } = req.params
  let resume

  try {
    resume = await Resume.findById(resumeId)
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }

  if (!resume) {
    return res
      .status(500)
      .json({ message: 'Unable to fetch resume, please try again' })
  }

  return res.status(200).json({ resume })
}

export const createResume = async (req, res) => {
  const {
    by,
    firstName,
    lastName,
    email,
    phoneNo,
    profession,
    shortdesc,
    github,
    linkedIn,
    twitter,
    facebook,
    instagram,
    location,
    college,
    collegeFrom,
    collegeTo,
    hsc,
    hscFrom,
    hscTo,
    school,
    schoolFrom,
    schoolTo,
    projects,
    experience,
    skills,
    interests,
    languages,
  } = req.body

  const collegeFromObject = moment(collegeFrom, 'DD/MM/YYYY')
    // .add(1, 'days')
    .toDate()
  const collegeToObject = moment(collegeTo, 'DD/MM/YYYY')
    // .add(1, 'days')
    .toDate()
  const schoolFromObject = moment(schoolFrom, 'DD/MM/YYYY')
    .add(1, 'days')
    .toDate()
  const schoolToObject = moment(schoolTo, 'DD/MM/YYYY')
    // .add(1, 'days')
    .toDate()
  const hscFromObject = moment(hscFrom, 'DD/MM/YYYY')
    // .add(1, 'days')
    .toDate()
  const hscToObject = moment(hscTo, 'DD/MM/YYYY')
    // .add(1, 'days')
    .toDate()

  const newResume = new Resume({
    by,
    firstName,
    lastName,
    email,
    phoneNo,
    profession,
    shortdesc,
    github,
    linkedIn,
    twitter,
    facebook,
    instagram,
    location,
    college,
    collegeFrom: collegeFromObject,
    collegeTo: collegeToObject,
    hsc,
    hscFrom: hscFromObject,
    hscTo: hscToObject,
    school,
    schoolFrom: schoolFromObject,
    schoolTo: schoolToObject,
    projects,
    experience,
    skills,
    interests,
    languages,
  })

  try {
    await newResume.save()
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }

  return res
    .status(201)
    .json({ message: 'Successfully added resume in the database', newResume })
}

export const deleteResume = async (req, res) => {
  const { resumeId } = req.params
  let deletedResume

  try {
    deletedResume = await Resume.deleteOne({ _id: resumeId })
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }

  if (!deletedResume) {
    return res
      .status(500)
      .json({ message: 'Unable to delete resume, please try again' })
  }

  return res
    .status(200)
    .json({ message: 'Resume deleted successfully', deletedResume })
}

export const searchResume = async (req, res) => {
  const { search } = req.body
  let resumes

  try {
    resumes = await Resume.find({
      $or: [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
      ],
    })
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }

  if (!resumes) {
    return res.status(200).json({ message: 'No resumes found' })
  }

  return res.status(200).json({ resumes })
}
