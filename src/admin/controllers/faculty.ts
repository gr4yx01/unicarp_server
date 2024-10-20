import { Request, Response } from "express";
import { prisma } from "../../db";

const getAllFaculty = async (req: Request, res: Response) => {
    try {
        const faculties = await prisma.faculty.findMany()

        res.status(200).json({
            message: 'Faculties',
            data: faculties
        })
    } catch(err) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

const getFacultyDepartments = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const faculty = await prisma.department.findMany({
            where: {
                facultyId: id
            }
        })

        res.status(200).json({
            message: 'Faculties',
            data: faculty
        })
    } catch(err) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}


const createFaculty = async (req: Request, res: Response) => {
    const body = req.body

    try {
        const faculty = await prisma.faculty.create({
            data: {
                name: body.name,
            }
        })

        res.status(201).json({
            message: 'Faculty created successfully',
            data: faculty
        })
    }catch (err) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

export {
    getAllFaculty,
    createFaculty,
    getFacultyDepartments
}