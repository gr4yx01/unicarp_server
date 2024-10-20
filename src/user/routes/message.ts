import { Router } from 'express'
import { createMessage, deleteMesssage, editMessage, fetchMessages } from '../controllers/message'

const messageRouter = Router()

messageRouter.post('/group/:id', createMessage)

messageRouter.get('/group/:id', fetchMessages)

messageRouter.delete('/:id', deleteMesssage)

messageRouter.put('/:id', editMessage)

export default messageRouter