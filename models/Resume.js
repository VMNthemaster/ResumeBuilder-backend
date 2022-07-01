import mongoose from 'mongoose'

// title of the resume will be "FirstName's resume"

const resumeSchema = new mongoose.Schema({ 
  by: {
    // this may contain objectid of User from database or email id 
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true, 
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
  shortdesc: {
    type: String,
    required: true,
  },
  github: {
    type: String,
    required: true,
  },
  linkedIn: {
    type: String,
    required: true,
  },
  twitter: {
    type: String,
    required: true,
  },
  facebook: {
    type: String,
    required: true,
  },
  instagram: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  collegeFrom: {
    type: Date,
    required: true,
  },
  collegeTo: {
    type: Date,
    required: true,
  },
  hsc: {
    type: String,
    required: true,
  },
  hscFrom: {
    type: Date,
    required: true,
  },
  hscTo: {
    type: Date,
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
  schoolFrom: {
    type: Date,
    required: true,
  },
  schoolTo: {
    type: Date,  
    required: true,
  },
  projects: [
    // we can create a separate schema for projects and use it here using projects.schema
    {
      title: String,
      link: String,
      description: String,
    },
  ],
  experience: [ 
    {
      institute: String,
      position: String,
      duration: String,
      description: String,
    },
  ],
  skills: [String],
  interests: [String],
  languages: [String]
})

export default mongoose.model('Resume', resumeSchema)