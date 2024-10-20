import { Router } from 'express'
import { createFaculty, getAllFaculty, getFacultyDepartments } from '../controllers/faculty'
import { isPublicRelationOfficer } from '../../middleware/user'

const facultyRouter = Router()

facultyRouter.post('/', isPublicRelationOfficer, createFaculty)

facultyRouter.get('/:id', getFacultyDepartments)

facultyRouter.get('/', getAllFaculty)

export default facultyRouter