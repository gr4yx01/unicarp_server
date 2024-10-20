import { Router } from "express";
import { acceptRequest, banMember, createGroup, deleteGroup, editGroup, fetchGroups, groupDashboard, groupMembers, groupMessages, membershipRequests, rejectRequest, removeMember } from "../controllers/group";
import { isPublicRelationOfficer } from "../../middleware/user";

const groupRouter = Router()

//create group
groupRouter.post('/', isPublicRelationOfficer,  createGroup)

//enter group dashboard
groupRouter.post('/', groupDashboard)

groupRouter.put('/:id', editGroup)

//discovery group
groupRouter.get('/', fetchGroups)

groupRouter.delete('/:id', deleteGroup)

//PRO
groupRouter.get('/:id/members', groupMembers)

groupRouter.get('/:id/messages', groupMessages)

groupRouter.post('/:groupId/user/:id/ban', banMember)

groupRouter.post('/:groupId/user/:id/remove', removeMember)

groupRouter.get('/:id/request', membershipRequests)

groupRouter.post('/:groupId/user/:id/accept', acceptRequest)

groupRouter.post('/:groupId/user/:id/reject', rejectRequest)

export default groupRouter;