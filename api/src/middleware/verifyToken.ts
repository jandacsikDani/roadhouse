import { Request, Response, NextFunction } from "express";
import  jwt from "jsonwebtoken";
import { nextTick } from "process";

const JWT_SECRET = process.env.JWT_SECRET || 'fallback';
console.log("JWT_SECRET: " + JWT_SECRET);

export interface AuthRequest extends Request{
    user?: {userId: string};
}

export function verifyToken(req: AuthRequest, res: Response, next: NextFunction){
    const authHeader = req.headers.authorization;
    console.log("authHeader: " + authHeader);
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        res.status(401).json({ message: "Missing or invalid token" });
        return;
    }

    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        req.user = { userId: decoded.userId };
        next();
    }catch (error){
        res.status(401).json({ message: "Invalid or expired token"});
        return;
    }
}