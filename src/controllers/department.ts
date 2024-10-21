import { Response, Request } from "express";
import { prisma } from "../db";

const createDepartment = async (req: Request, res: Response) => {
    const { name, facultyId } = req.body

    try {

        const departmentExist = await prisma.department.findFirst({
            where: {
                name,
                facultyId
            }
        })

        if(departmentExist) {
            res.status(409).json({
                message: 'Department already exists'
            })
            return;
        }

        const department = await prisma.department.create({
            data: {
                name,
                facultyId
            }
        })

        res.status(201).json({
            message: "Successfully created",
            data: department
        })
    } catch(err) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}


const deleteDepartment = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        await prisma.department.delete({
            where: {
                id
            }
        })

        res.status(200).json({
            message: 'Successfully deleted',
        })
    } catch(err) {
        res.status(500).json({
            message: 'Internal server error',
            error: err
        })
    }
    res.send('delete department')
}

export {
    createDepartment,
    deleteDepartment
}