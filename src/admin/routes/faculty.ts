import { Router } from 'express'
import { createFaculty, getAllFaculty } from '../controllers/faculty'
import { isPublicRelationOfficer } from '../../middleware/user'

const facultyRouter = Router()

facultyRouter.post('/', isPublicRelationOfficer, createFaculty)

facultyRouter.get('/', getAllFaculty)

export default facultyRouter