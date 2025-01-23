import { Router } from "express";
import { fetchUserGroups, joinGroup, accessGroup, promoteToPRO, demotePRO, allStudents, getUserProfile, updateProfile } from "../controllers/user";
import { isAdmin, isGroupMember } from "../middleware/user";
import { verifyToken } from "../middleware/auth";

const userRouter = Router()

userRouter.get('/profile', verifyToken, getUserProfile)

userRouter.put('/profile', verifyToken, updateProfile)

userRouter.get('/:id/groups', fetchUserGroups)

userRouter.post('/:id/group/join', joinGroup)

userRouter.get('/:userId/group/:groupId', verifyToken, isGroupMember, accessGroup)

userRouter.put('/:id/promote', verifyToken, isAdmin, promoteToPRO)

userRouter.put('/:id/demote', verifyToken, isAdmin, demotePRO)

userRouter.get('/students', verifyToken, isAdmin, allStudents)

export default userRouter;