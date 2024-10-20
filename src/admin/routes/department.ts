import { Router } from "express";
import { createDepartment, deleteDepartment, fetchDepartments } from "../controllers/department";
import { isPublicRelationOfficer } from "../../middleware/user";

const departmentRouter = Router()

departmentRouter.post('/', isPublicRelationOfficer, createDepartment)

departmentRouter.get('/:facultyId', fetchDepartments)

departmentRouter.delete('/:id', isPublicRelationOfficer, deleteDepartment)

export default departmentRouter