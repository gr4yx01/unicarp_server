import { Router } from 'express'
import { createFaculty, getAllFaculty, getFacultyDepartments } from '../controllers/faculty'
import { isAdmin } from '../middleware/user'
import { verifyToken } from '../middleware/auth'

const facultyRouter = Router()

facultyRouter.post('/', createFaculty)

facultyRouter.get('/:id',getFacultyDepartments)

facultyRouter.get('/', getAllFaculty)

export default facultyRouter