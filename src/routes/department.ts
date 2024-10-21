import { Router } from "express";
import { createDepartment, deleteDepartment } from "../controllers/department";
import { isAdmin, isPublicRelationOfficer } from "../middleware/user";

const departmentRouter = Router()

departmentRouter.post('/', isAdmin, createDepartment)

departmentRouter.delete('/:id', isAdmin, deleteDepartment)

export default departmentRouter
