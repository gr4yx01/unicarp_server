import { Router } from "express";
import { isAdmin } from "../middleware/user";
import { adminLogin, adminRegister, loginUser, registerUser } from "../controllers/auth";

const authRouter = Router()

authRouter.post('/register', registerUser)

authRouter.post('/login', loginUser)

authRouter.post('/admin/register', adminRegister)

authRouter.post('/admin/login', adminLogin)


export default authRouter
