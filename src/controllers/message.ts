import { Request, Response } from "express"
import { prisma } from "../db"

const createMessage = async (req: Request, res: Response) => {
    const { title, description, groupId } = req.body

    try {
        const message = await prisma.message.create({
            data: {
                title,
                description,
                groupId
            }
        })

        res.status(201).json({
            message: 'Message created successfully',
            data: message
        })
    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: err
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

const editMessage = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const message = await prisma.message.findUnique({
            where: {
                id
            }
        })

        if(!message) {
            res.status(404).json({
                message: 'Message not found'
            })
        }

        await prisma.message.update({
            where: {
                id
            },
            data: {
                ...req.body
            }
        })

        res.status(200).json({
            message: 'Message updated successfully'
        })
    } catch (err) {
        res.status(500).json({
            message: 'Internal server error',
            error: err
        })
    }
}

export {
    createMessage,
    fetchMessages,
    deleteMesssage,
    editMessage
}