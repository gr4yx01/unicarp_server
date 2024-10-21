import { Router } from 'express'
import { createMessage, deleteMesssage, editMessage, fetchMessages } from '../controllers/message'
import { isAdminOrPRO, isPublicRelationOfficer } from '../middleware/user'
import { verifyToken } from '../middleware/auth'

const messageRouter = Router()

messageRouter.post('/', verifyToken, isPublicRelationOfficer, createMessage)

messageRouter.delete('/:id', verifyToken, isAdminOrPRO(['PRO', 'ADMIN']), deleteMesssage)

export default messageRouter
