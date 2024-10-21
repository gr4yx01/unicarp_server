import { NextFunction, Request, Response } from "express";
import { prisma } from "../db";

const isStudent = async (req: Request, res: Response, next: NextFunction) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.userId
        }
    })
    if (user?.role === 'STUDENT') {
        next()
    } else {
        res.status(401).json({
            message: 'Unauthorised'
        })
    }
}

const isGroupMember = async (req: Request, res: Response, next: NextFunction) => {
    const { userId, groupId } = req.params

    const groupMember = await prisma.groupMember.findFirst({
        where: {
            userId,
            groupId
        }
    })
    
    let message;

    switch(groupMember?.status) {
        case 'BANNED':
            message = 'You are banned from this group'
            break
        case 'PENDING':
            message = 'Request pending for approval'
            break
        default:
            message = 'Unauthorized'
            break
    }

    if(groupMember?.status === 'ACTIVE') {
        next()
    }else {
        res.status(401).json({
            message: message
        })
    }
}

const isAdminOrPRO = (roles: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const user = await prisma.user.findUnique({
            where: {
                id: req.userId
            }
        })
        if(roles.includes(user?.role)) {
            next()
        }else {
            res.status(401).json({
                message: 'Unauthorised'
            })
        }
    }
}

const isPublicRelationOfficer = async (req: Request, res: Response, next: NextFunction) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req?.userId
        }
    })
    if (user?.role === 'PRO') {
        next()
    } else {
        res.status(401).json({
            message: 'Unauthorised'
        })
    }
}

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req?.userId
        }
    })
    if (user?.role === 'ADMIN') {
        next()
    } else {
        res.status(401).json({
            message: 'Unauthorised'
        })
    }
}


export {
    isStudent,
    isPublicRelationOfficer,
    isAdmin,
    isAdminOrPRO,
    isGroupMember
}