import { request, Request, Response } from "express"
import { prisma } from "../db"
import groupSchema from "../validator/group";

const createGroup = async (req: Request, res: Response) => {
    const userId = req.userId as string;
    
    const { error } = groupSchema.validate(req.body);

    if(error) {
        res.status(400).send({ message: error.details[0].message });
        return;
    }
    
    try {
        const group = await prisma.group.create({
            data: {
                ...req.body
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
        console.log(err);
        res.status(500).json({
            message: 'Internal server error',
            error: err
        })
    }
}

const editGroup = async (req: Request, res: Response) => {
    const { id } = req.params
    const { name, description } = req.body

    try {
        await prisma.group.update({
            where: {
                id,
            },
            data: {
                name,
                description
            }
        })
        
        res.status(200).json({
            message: 'successfully updated'
        })
    } catch(err) {
        res.status(500).json({
            message: 'Internal server error',
            error: err
        })
    }
}

const deleteGroup = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        await prisma.$transaction([
            prisma.group.delete({
              where: {
                id
              },
            }),
            
            prisma.groupMember.deleteMany({
                where: {
                  groupId: id,
                },
              })
          ]);

        res.status(200).json({
            message: 'Group deleted successfully'
        })
    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: 'Internal server error',
            error: err
        })
    }
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

const groupDashboard = async (req: Request, res: Response) => {
    res.send('group create')
}

const groupMembers = async (req: Request, res: Response) => {
   const { id } = req.params

   try {
        const group = await prisma.group.findUnique({
            where: {
                id
            },
            include: {
                members: {
                    include: {
                        user: true
                    }
                }
            }
        })

        res.status(200).json(group?.members)
   } catch(err) {
    res.status(500).json({
        message: 'Internal server error',
        error: err
    })
   }
}

const groupMessages = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const group = await prisma.group.findUnique({
            where: {
                id
            },
            include: {
                messages: {
                    orderBy: {
                        created_at: 'desc' // Sort messages by the created_at field in descending order
                    },
                }
            }
        })

        res.status(200).json({
            message: 'Group message',
            data: group?.messages
        })
    } catch(err) {
        res.status(500).json({
            message: 'Internal server error',
            error: err
        })
    }
}


const banMember = async (req: Request, res: Response) => {
    const { id, groupId } = req.params

    try {
        const memberExist = await prisma.groupMember.findFirst({
            where: {
                userId: id,
                groupId
            }
        })

        await prisma.groupMember.update({
            where: {
                id: memberExist?.id
            },
            data: {
                status: 'BANNED'
            }
        })

        res.status(200).json({
            message: 'User banned',
        })
    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: 'Internal server error',
            error: err
        })
    }
}

const restoreMember = async (req: Request, res: Response) => {
    const { id, groupId } = req.params

    try {
        const memberExist = await prisma.groupMember.findFirst({
            where: {
                userId: id,
                groupId
            }
        })

        await prisma.groupMember.update({
            where: {
                id: memberExist?.id
            },
            data: {
                status: 'ACTIVE'
            }
        })

        res.status(200).json({
            message: 'User Restored'
        })
    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: 'Internal server error',
            error: err
        })
    }
}


const removeMember = async (req: Request, res: Response) => {
    const { id, groupId } = req.params

    try {
        const memberExist = await prisma.groupMember.findFirst({
            where: {
                userId: id,
                groupId
            }
        })

        await prisma.groupMember.delete({
            where: {
                id: memberExist?.id
            }
        })

        res.status(200).json({
            message: 'User removed',
        })
    } catch(err) {
        res.status(500).json({
            message: 'Internal server error',
            error: err
        })
    }
}

const membershipRequests = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const requests = await prisma.groupMember.findMany({
            where: {
                groupId: id,
                status: 'PENDING'
            }
        })

        res.status(200).json({
            message: 'list of requests',
            data: requests
        })
    } catch(err) {
        res.status(500).json({
            message: 'Internal server error',
            error: err
        })
    }
}

const acceptRequest = async (req: Request, res: Response) => {
    const { id, groupId } = req.params

    try {
        const requestExist = await prisma.groupMember.findFirst({
            where: {
                groupId,
                userId: id
            }
        })


        const member = await prisma.groupMember.update({
            where: {
                id: requestExist?.id
            },
            data: {
                status: 'ACTIVE'
            }
        })

        res.status(200).json({
            message: 'Request accepted',
            data: member
        })
    } catch(err) {
        res.status(500).json({
            message: 'Internal server error',
            error: err
        })
    }
}

const rejectRequest = async (req: Request, res: Response) => {
    const { id, groupId } = req.params

    try {
        const requestExist = await prisma.groupMember.findFirst({
            where: {
                groupId,
                userId: id
            }
        })

        const member = await prisma.groupMember.delete({
            where: {
                id: requestExist?.id
            }
        })

        res.status(200).json({
            message: 'Request rejected',
            data: member
        })
    } catch(err) {
        res.status(500).json({
            message: 'Internal server error',
            error: err
        })
    }
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
    rejectRequest,
    restoreMember
}