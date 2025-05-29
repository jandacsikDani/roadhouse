import { Request, Response, NextFunction } from "express";

export function requireApiKey(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'];
    const API_KEY = process.env.API_KEY;
    if(API_KEY == apiKey){
            next();
        }else{
            res.status(403).json({message: "Request denied"});
        }
}