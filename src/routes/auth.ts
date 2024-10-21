import { Router } from "express";
import { isAdmin } from "../middleware/user";
import { loginUser, registerUser } from "../controllers/auth";

const authRouter = Router()

authRouter.post('/register', registerUser)

authRouter.post('/login', loginUser)

export default authRouter
