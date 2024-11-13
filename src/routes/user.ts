import { Router } from "express";
import { fetchUserGroups, joinGroup, accessGroup, promoteToPRO, demotePRO, allStudents, getUserProfile } from "../controllers/user";
import { isAdmin, isGroupMember } from "../middleware/user";
import { verifyToken } from "../middleware/auth";

const userRouter = Router()

userRouter.get('/profile', verifyToken, getUserProfile)

userRouter.get('/', verifyToken, isAdmin, allStudents)

userRouter.get('/:id/groups', fetchUserGroups)

userRouter.post('/:id/group/join', joinGroup)

userRouter.get('/:userId/group/:groupId', verifyToken, isGroupMember, accessGroup)

userRouter.get('/:id/promote', verifyToken, isAdmin, promoteToPRO)

userRouter.get('/:id/demote', verifyToken, isAdmin, demotePRO)


export default userRouter;