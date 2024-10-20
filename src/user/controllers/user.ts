import { Request, Response } from "express"

const registerUser = (req: Request, res: Response) => {
    const data = req.body;

    res.send(data)
}

const loginUser = (req: Request, res: Response) => {
    res.send('group create')
}

const fetchUserGroups = (req: Request, res: Response) => {
    res.send('group create')
}

const joinGroup = (req: Request, res: Response) => {
    res.send('group create')
}

export {
    fetchUserGroups,
    joinGroup,
    registerUser,
    loginUser
}