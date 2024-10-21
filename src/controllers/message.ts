import { Request, Response } from "express"
import { prisma } from "../db"

const createMessage = async (req: Request, res: Response) => {
    const { text, groupId } = req.body

    try {
        const message = await prisma.message.create({
            data: {
                text,
                groupId
            }
        })

        res.status(201).json({
            message: 'Message created successfully',
            data: message
        })
    } catch(err) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

const fetchMessages = (req: Request, res: Response) => {
    res.send('message create')
}

const deleteMesssage = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        await prisma.message.delete({
            where: {
                id
            }
        })

        res.status(200).json({
            message: 'Message deleted successfully'
        })
    } catch(err) {
        res.status(500).json({
            message: 'Internal server error',
            error: err
        })
    }
}

const editMessage = (req: Request, res: Response) => {
    res.send('message create')
}

export {
    createMessage,
    fetchMessages,
    deleteMesssage,
    editMessage
}