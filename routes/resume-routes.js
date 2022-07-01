import express from 'express'
import { createResume, deleteResume, getAllResumes, getSingleResume, searchResume } from '../controllers/resume-controller'

const resumeRouter = express.Router()

// get all resumes
resumeRouter.get('/', getAllResumes)

// get a single resume using resume model id
resumeRouter.get('/:resumeId', getSingleResume)

resumeRouter.post('/',searchResume)

// create a resume
resumeRouter.post('/create', createResume)

///delete a resume
resumeRouter.delete('/:resumeId', deleteResume)

export default resumeRouter