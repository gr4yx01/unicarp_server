import { NextFunction, Request, Response } from "express";

const isStudent = (req: Request, res: Response, next: NextFunction) => {
    if (req.headers['user-role'] === 'STUDENT') {
        next()
    } else {
        res.status(401).json({
            message: 'Unauthorised'
        })
    }
}

const isPublicRelationOfficer = (req: Request, res: Response, next: NextFunction) => {
    if (req.headers['user-role'] === 'PRO') {
        next()
    } else {
        res.status(401).json({
            message: 'Unauthorised'
        })
    }
}

export {
    isStudent,
    isPublicRelationOfficer
}