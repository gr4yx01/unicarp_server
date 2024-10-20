import { Router } from "express";
import { createDepartment, deleteDepartment } from "../controllers/department";
import { isPublicRelationOfficer } from "../../middleware/user";

const departmentRouter = Router()

departmentRouter.post('/', isPublicRelationOfficer, createDepartment)

departmentRouter.delete('/:id', isPublicRelationOfficer, deleteDepartment)

export default departmentRouter
