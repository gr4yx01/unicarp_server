import { Request, Response } from "express";
import { prisma } from "../db";
import data from '../data/facultiesDeptUNN.json'

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

const deleteFaculty = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        await prisma.faculty.delete({
            where: {
                id
            }
        })
    } catch(err) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

const createFaculty = async (req: Request, res: Response) => {

    try {

        data.forEach(async (faculty: any) => {
            const createdFaculty = await prisma.faculty.create({
                data: {
                    name: faculty.name
                }
            })

            faculty.departments.forEach(async (department: any) => {
                await prisma.department.create({
                    data: {
                        name: department,
                        facultyId: createdFaculty.id
                    }
                })
            })
        })

        res.status(201).json({
            message: 'Faculty and departments created successfully',
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
    getFacultyDepartments,
    deleteFaculty
}
