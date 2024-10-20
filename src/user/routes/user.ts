import { Router } from "express";
import { fetchUserGroups, joinGroup, loginUser, registerUser } from "../controllers/user";

const userRouter = Router()

userRouter.post('/register', registerUser)

userRouter.post('/login', loginUser)

userRouter.get('/groups', fetchUserGroups)

userRouter.post('/group/:id', joinGroup)

export default userRouter;