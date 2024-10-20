import { Request, Response } from "express"

const createMessage = (req: Request, res: Response) => {
    res.send('message create')
}

const fetchMessages = (req: Request, res: Response) => {
    res.send('message create')
}

const deleteMesssage = (req: Request, res: Response) => {
    res.send('message create')
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