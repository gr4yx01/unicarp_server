import { Router } from "express";
import { acceptRequest, banMember, createGroup, deleteGroup, editGroup, fetchGroups, groupDashboard, groupMembers, groupMessages, membershipRequests, rejectRequest, removeMember, restoreMember } from "../controllers/group";
import { isAdminOrPRO, isGroupMember, isPublicRelationOfficer } from "../middleware/user";
import { verifyToken } from "../middleware/auth";

const groupRouter = Router()

//create group
groupRouter.post('/', verifyToken, isPublicRelationOfficer,  createGroup)

//discovery group
groupRouter.get('/', fetchGroups)

// delete group
groupRouter.delete('/:id', verifyToken, isAdminOrPRO(["PRO", "ADMIN"]), deleteGroup)

//enter group dashboard
groupRouter.post('/', groupDashboard)

groupRouter.put('/:id', verifyToken, isPublicRelationOfficer, editGroup)

//PRO
groupRouter.get('/:id/members', verifyToken, isPublicRelationOfficer, groupMembers)

groupRouter.get('/:id/messages', groupMessages)

groupRouter.put('/:groupId/user/:id/ban', verifyToken, isGroupMember, banMember)

groupRouter.put('/:groupId/user/:id/unban', verifyToken, isPublicRelationOfficer, restoreMember)

groupRouter.put('/:groupId/user/:id/remove', removeMember)

groupRouter.get('/:id/requests', verifyToken, isPublicRelationOfficer, membershipRequests)

groupRouter.put('/:groupId/user/:id/accept', verifyToken, isPublicRelationOfficer, acceptRequest)

groupRouter.put('/:groupId/user/:id/reject', verifyToken, isPublicRelationOfficer, rejectRequest)

export default groupRouter;