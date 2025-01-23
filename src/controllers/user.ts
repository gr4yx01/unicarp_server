import { Request, Response } from "express"
import { prisma } from "../db";

const fetchUserGroups = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const groups = await  prisma.groupMember.findMany({
            where: {
                userId: id
            },
            include: {
                group: {
                    include: {
                        members: {
                            include: {
                                user: true
                            }
                        },
                        messages: true
                    }
                }
            }
        })

        res.status(200).json({
            message: 'Groups',
            data: groups
        })
    } catch(err) {
        res.status(500).json({
            message: 'Internal server error',
            error: err
        })
    }
}

const updateProfile = async (req: Request, res: Response) => {
    try {
        const response = await prisma.user.update({
            where: {
                id: req.userId
            },
            data: {
                ...req.body
            }
        })

        res.status(200).json({
            message: 'Profile updated successfully',
            data: response
        })
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
}

const joinGroup = async (req: Request, res: Response) => {
    const { id } = req.params
    const { groupId } = req.body

    try {
        const group = await prisma.group.findUnique({
            where: {
                id: groupId
            }
        })

        const userExists = await prisma.groupMember.findFirst({
            where: {
                groupId,
                userId: id
            }
        })

        if(userExists) {
            res.status(409).json({
                message: 'Student is already a member'
            })
            return;
        }

        await prisma.groupMember.create({
            data: {
                groupId,
                userId: id,
                role: 'STUDENT',
                status: group?.visibility === 'PRIVATE' ? 'PENDING' : 'ACTIVE'
            }
        })
        
        let message = group?.visibility === 'PRIVATE' ? 'Request pending' : 'Group joined successfully'

        res.status(200).json({
            message: message,
            data: group
        })
    } catch(err) {
        res.status(500).json({
            message: 'Internal server error',
            error: err
        })
    }
}

const accessGroup = async (req: Request, res: Response) => {
    const { userId, groupId } = req.params

    try {
        const group = await prisma.groupMember.findFirst({
            where: {
                userId,
                groupId
            },
            include: {
                user: true,
                group: true
            }
        })
        
        res.status(200).json({
            message: '',
            data: group
        })
    } catch(err) {
        res.status(500).json({
            message: 'Internal server error',
            error: err
        })
    }
}

const allStudents = async (req: Request, res: Response) => {
    try {
        const students = await prisma.user.findMany({
            include: {
                faculty: true,
                department: true,
                
            }
        })

        res.status(200).json({
            message: 'student list',
            data: students
        })
    } catch(err) {
        res.status(500).json({
            message: 'Internal server error',
            error: err
        })
    }
}

const promoteToPRO = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        await prisma.user.update({
            where: {
                id
            },
            data: {
                role: 'PRO'
            }
        })

        res.status(200).json({
            message: 'Student has been promoted to PRO'
        })
    } catch(err) {
        res.status(500).json({
            message: 'Internal server error',
            error: err
        })
    }
}   

const demotePRO = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        await prisma.user.update({
            where: {
                id
            },
            data: {
                role: 'STUDENT'
            }
        })

        res.status(200).json({
            message: 'Successfully demoted'
        })
    } catch(err) {
        res.status(500).json({
            message: 'Internal server error',
            error: err
        })
    }
}   

const getUserProfile = async (req: Request, res: Response) => {
    try {
        const userProfile = await prisma.user.findUnique({
            where: {
                id: req.userId
            }
        })

        res.status(200).json({
            message: 'user profile',
            data: userProfile
        })
    } catch (err) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

export {
    fetchUserGroups,
    joinGroup,
    accessGroup,
    promoteToPRO,
    demotePRO,
    allStudents,
    getUserProfile,
    updateProfile
}
