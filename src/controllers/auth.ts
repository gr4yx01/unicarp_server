import {  NextFunction, Request, Response } from "express";
import userSchema from "../validator/user";
import * as argon from 'argon2'
import { prisma } from "../db";
import jwt from "jsonwebtoken";
import { HttpStatusCode } from "axios";

const registerUser = async (req: Request, res: Response) => {
    const { name, email, facultyId, departmentId, academicLevel, password } = req.body;

    const { error } = userSchema.validate(req.body)

    if(error) {
        res.status(400).send({ message: error.details[0].message });
        return;
    }

    try {
        const emailExists = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if(emailExists) {
            res.status(409).json({
                message: 'User with email already Exist'
            })
            return;
        }

        const hashPassword = await argon.hash(password)

        const secret = process.env.JWT_SECRET;

        console.log(secret)

        if(secret) {
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

            const data = {
                name,
                userId: user.id,
                hashPassword,
            }   

            const token = jwt.sign(data, secret, {
                expiresIn: '10h'
            });

            res.status(201).json({
                message: 'User created successfully',
                data: token
            })
        }
    } catch (err) {
        res.status(500).json({
            message: 'Internal server error',
            error: err
        })
    }
}

const loginUser = async (req: Request, res: Response) => {
    const { email, password, role } = req.body

    console.log(req.body)

    try {
        const userExist = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if(!userExist) {
            res.status(404).json({
                message: "You don't have an account"
            })
            return;
        }

        if( role === 'PRO' && userExist.role === 'STUDENT') {
            res.status(401).json({
                message: "You can't login as a public relation officer"
            })
            return;
        }

    const isVerified = await argon.verify(userExist?.hashPassword, password)

    if(!isVerified) {
        res.status(HttpStatusCode.Unauthorized).json({
            message: 'Incorrect password'
        })
        return;
    }

    const data = {
        name: userExist?.name,
        userId: userExist?.id,
        password: userExist?.hashPassword
    }

    const secret = process.env.JWT_SECRET

    console.log(secret)

    if(secret) {
        const token = jwt.sign(data,secret, {
            expiresIn: '10h'
        })

        res.status(200).json({
            message: 'Login successful',
            data: token
        })
    }
    } catch (err) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

const adminRegister = async (req: Request, res: Response) => {
    const { email, password } = req.body

    try {
        const emailExist = await prisma.admin.findFirst({
            where: {
                email
            }
        })

        if(emailExist) {
            res.status(409).json({
                message: 'User with email already exist'
            })
            return;
        }

        const hashPassword = await argon.hash(password)

        const secret = process.env.JWT_SECRET

        if(secret) {
            const user = await prisma.admin.create({
                data: {
                    email,
                    hashPassword,
                }
            })

            const data = {
                userId: user.id,
                password: user.hashPassword
            }

            const token = jwt.sign(data, secret, {
                expiresIn: '10h'
            })

            res.status(201).json({
                message: 'Admin created successfully',
                data: token
            })
        }
    } catch (err) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

const adminLogin = async (req: Request, res: Response) =>  {
    const { email, password } = req.body

    try {
        const userExist = await prisma.admin.findFirst({
            where: {
                email
            }
        })

        if(!userExist) {
            res.status(404).json({
                message: "You don't have an account"
            })
            return;
        }

        const isVerified = await argon.verify(userExist?.hashPassword, password)

        if(!isVerified) {
            res.status(HttpStatusCode.Unauthorized).json({
                message: 'Incorrect password'
            })
            return;
        }

        const data = {
            userId: userExist?.id,
            password: userExist?.hashPassword
        }

        const secret = process.env.JWT_SECRET

        if(secret) {
            const token = jwt.sign(data, secret, {
                expiresIn: '10h'
            })

            res.status(200).json({
                message: 'Login successful',
                data: token
            })
        }
    } catch (err) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

export {
    registerUser,
    loginUser,
    adminLogin,
    adminRegister
}