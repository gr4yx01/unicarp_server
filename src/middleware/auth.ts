import { NextFunction, Request, Response } from "express";

// Extend the Request interface to include userId
declare module 'express-serve-static-core' {
  interface Request {
    userId?: string;
  }
}
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {

    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
      res.status(401).send('Access Denied');

      return;
    }
  
    try {
        
        const secret = process.env.JWT_SECRET
        if(!secret) {
            res.status(404).json({
                message: 'Jwt secret not found'
            })
        }else {
            const verified = jwt.verify(token, secret);
            req.userId = (verified as jwt.JwtPayload)?.userId
            next();
        }
    } catch (err) {
      res.status(400).send('Invalid Token');
  
    }
  
  };

  export {
    verifyToken
  }