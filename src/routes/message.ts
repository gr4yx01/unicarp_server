import { Router } from 'express'
import { createMessage, deleteMesssage, editMessage, fetchMessages } from '../controllers/message'
import { isAdminOrPRO, isPublicRelationOfficer } from '../middleware/user'

const messageRouter = Router()

messageRouter.post('/', isPublicRelationOfficer, createMessage)

messageRouter.delete('/:id', isAdminOrPRO(['PRO', 'ADMIN']), deleteMesssage)

export default messageRouter
