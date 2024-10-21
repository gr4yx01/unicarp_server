import {  NextFunction, Request, Response } from "express";
import userSchema from "../validator/user";
import * as argon from 'argon2'
import { prisma } from "../db";
import jwt from "jsonwebtoken";

const registerUser = async (req: Request, res: Response) => {
    const { name, email, facultyId, departmentId, academicLevel, password } = req.body;

    const { error } = userSchema.validate(req.body)

    if(error) {
        res.status(400).send({ message: error.details[0].message });
        return;
    }

    try {
        // check if user exist
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

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET is not defined");
        }
        const token = jwt.sign(data, secret, {
            expiresIn: '3h'
        });

        res.status(201).json({
            message: 'User created successfully',
            // data: user
            data: token
        })
    } catch (err) {
        res.status(500).json({
            message: 'Internal server error',
            error: err
        })
    }
}

const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body

    try {
        const userExist = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if(!userExist) {
            res.status(404).json({
                message: 'No account found'
            })
            return;
        }

    const isVerified = argon.verify(userExist?.hashPassword, password)

    if(!isVerified) {
        res.status(404).json({
            message: 'Incorrect password'
        })
    }

    const data = {
        name: userExist?.name,
        userId: userExist?.id,
        password: userExist?.hashPassword
    }

    const secret = process.env.JWT_SECRET

    if(secret) {
        const token = jwt.sign(data,secret, {
            expiresIn: '3h'
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
    loginUser
}