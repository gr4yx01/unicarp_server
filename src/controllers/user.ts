import { Request, Response } from "express"
import { prisma } from "../db";
import * as argon from "argon2";
import userSchema from "../validator/user";

const registerUser = async (req: Request, res: Response) => {
    const { name, email, facultyId, departmentId, academicLevel, password } = req.body;

    const { error } = userSchema.validate(req.body)

    if(error) {
        res.status(400).send({ message: error.details[0].message });
        return;
    }

    try {

        const hashPassword = await argon.hash(password)

        const user = await prisma.user.create({
            data: {
                email,
                hashPassword,
                facultyId,
                departmentId,
                academicLevel,
                name,
                role: 'STUDENT'
            }
        })

        res.status(201).json({
            message: 'User created successfully',
            data: user
        })
    } catch (err) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

const loginUser = (req: Request, res: Response) => {
    res.send('group create')
}

const fetchUserGroups = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const groups = await  prisma.groupMember.findMany({
            where: {
                userId: id
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

export {
    fetchUserGroups,
    joinGroup,
    registerUser,
    loginUser,
    accessGroup
}