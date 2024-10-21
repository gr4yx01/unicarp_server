import { Router } from "express";
import { acceptRequest, banMember, createGroup, deleteGroup, editGroup, fetchGroups, groupDashboard, groupMembers, groupMessages, membershipRequests, rejectRequest, removeMember } from "../controllers/group";
import { isAdmin, isAdminOrPRO, isPublicRelationOfficer } from "../middleware/user";

const groupRouter = Router()

//create group
groupRouter.post('/', isPublicRelationOfficer,  createGroup)

//discovery group
groupRouter.get('/', fetchGroups)

// delete group
groupRouter.delete('/:id', isAdminOrPRO(["PRO", "ADMIN"]), deleteGroup)

//enter group dashboard
groupRouter.post('/', groupDashboard)

groupRouter.put('/:id', editGroup)

//PRO
groupRouter.get('/:id/members', isPublicRelationOfficer, groupMembers)

groupRouter.get('/:id/messages', groupMessages)

groupRouter.post('/:groupId/user/:id/ban', banMember)

groupRouter.post('/:groupId/user/:id/remove', removeMember)

groupRouter.get('/:id/request', membershipRequests)

groupRouter.post('/:groupId/user/:id/accept', acceptRequest)

groupRouter.post('/:groupId/user/:id/reject', rejectRequest)

export default groupRouter;