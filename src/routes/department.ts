import { Router } from "express";
import { createDepartment, deleteDepartment } from "../controllers/department";
import { isAdmin, isPublicRelationOfficer } from "../middleware/user";
import { verifyToken } from "../middleware/auth";

const departmentRouter = Router()

departmentRouter.post('/', verifyToken, isAdmin, createDepartment)

departmentRouter.delete('/:id', verifyToken, isAdmin, deleteDepartment)

export default departmentRouter
