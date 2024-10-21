import { Router } from "express";
import { acceptRequest, banMember, createGroup, deleteGroup, editGroup, fetchGroups, groupDashboard, groupMembers, groupMessages, membershipRequests, rejectRequest, removeMember } from "../controllers/group";
import { isAdmin, isAdminOrPRO, isPublicRelationOfficer } from "../middleware/user";
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

groupRouter.post('/:groupId/user/:id/ban', banMember)

groupRouter.post('/:groupId/user/:id/remove', removeMember)

groupRouter.get('/:id/requests', verifyToken, isPublicRelationOfficer, membershipRequests)

groupRouter.post('/:groupId/user/:id/accept', verifyToken, isPublicRelationOfficer, acceptRequest)

groupRouter.post('/:groupId/user/:id/reject', verifyToken, isPublicRelationOfficer, rejectRequest)

export default groupRouter;