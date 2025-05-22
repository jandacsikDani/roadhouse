import { Request, Response, NextFunction } from "express";

const keys = [
    '8i6hXPM2rOcim5l3auyNP4bDp'
];

export function requireApiKey(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'];
    keys.forEach(key => {
        if(key == apiKey){
            next();
        }else{
            res.status(403).json({message: "Request denied"});
        }
    });
}