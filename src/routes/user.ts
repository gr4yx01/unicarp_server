import { Router } from "express";
import { fetchUserGroups, joinGroup, loginUser, registerUser, accessGroup, promoteToPRO } from "../controllers/user";
import { isAdmin, isGroupMember } from "../middleware/user";

const userRouter = Router()

userRouter.post('/register', registerUser)

userRouter.post('/login', loginUser)

userRouter.get('/:id/groups', fetchUserGroups)

userRouter.post('/:id/group/join', joinGroup)

userRouter.get('/:userId/group/:groupId', isGroupMember, accessGroup)

userRouter.get('/:id', isAdmin, promoteToPRO)

export default userRouter;