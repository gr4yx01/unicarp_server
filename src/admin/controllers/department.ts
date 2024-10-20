import { Response, Request } from "express";
import { prisma } from "../../db";

const createDepartment = async (req: Request, res: Response) => {
    const { name, facultyId } = req.body

    try {
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

const fetchDepartments = (req: Request, res: Response) => {
    res.send('edit department')
}

const deleteDepartment = (req: Request, res: Response) => {
    res.send('delete department')
}

export {
    createDepartment,
    fetchDepartments,
    deleteDepartment
}