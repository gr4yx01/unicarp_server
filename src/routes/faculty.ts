import { Router } from 'express'
import { createFaculty, getAllFaculty, getFacultyDepartments } from '../controllers/faculty'
import { isAdmin, isPublicRelationOfficer } from '../middleware/user'

const facultyRouter = Router()

facultyRouter.post('/', isAdmin, createFaculty)

facultyRouter.get('/:id', getFacultyDepartments)

facultyRouter.get('/', getAllFaculty)

export default facultyRouter