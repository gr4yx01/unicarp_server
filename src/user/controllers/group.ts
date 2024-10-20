import { Request, Response } from "express"
import { prisma } from "../../db"
import groupSchema from "../../validator/group";

const createGroup = async (req: Request, res: Response) => {
    const {name, description, visibility, userId } = req.body
    const { error } = groupSchema.validate(req.body);

    if(error) {
        res.status(400).send({ message: error.details[0].message });
        return;
    }

    try {
        const group = await prisma.group.create({
            data: {
                name,
                description,
                visibility
            }
        })

        await prisma.groupMember.create({
            data: {
                groupId: group.id,
                userId,
                role: 'PRO',
                status: 'ACTIVE'
            }
        })

        res.status(201).json({
            message: 'Group created successfully',
            data: group
        })
    }catch(err) {
        res.status(500).json({
            message: 'Internal server error',
            error: err
        })
    }
}

const editGroup = (req: Request, res: Response) => {
    res.send('group create')
}

const deleteGroup = (req: Request, res: Response) => {
    res.send('group create')
}

const fetchGroups = async (req: Request, res: Response) => {
    try {
        const groups = await prisma.group.findMany({
            include: {
                members: {
                    include: {
                        user: true
                    }
                }
            }
        })

        res.status(200).json({
            message: 'list of groups',
            data: groups
        })
    } catch (err) {
        res.status(500).json({
            message: 'Internal server error',
            error: err
        })
    }
}

const groupDashboard = (req: Request, res: Response) => {
    res.send('group create')
}

const groupMembers = (req: Request, res: Response) => {
    res.send('group create')
}

const groupMessages = (req: Request, res: Response) => {
    res.send('group create')
}


const banMember = (req: Request, res: Response) => {
    res.send('group create')
}


const removeMember = (req: Request, res: Response) => {
    res.send('group create')
}

const membershipRequests = (req: Request, res: Response) => {
    res.send('group create')
}


const acceptRequest = (req: Request, res: Response) => {
    res.send('group create')
}


const rejectRequest = (req: Request, res: Response) => {
    res.send('group create')
}




export {
    createGroup,
    editGroup,
    deleteGroup,
    fetchGroups,
    groupDashboard,
    groupMembers,
    groupMessages,
    banMember,
    removeMember,
    membershipRequests,
    acceptRequest,
    rejectRequest
}