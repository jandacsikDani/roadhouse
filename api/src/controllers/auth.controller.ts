import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../shared/db';

const JWT_SECRET = process.env['JWT_SECRET'] || 'fallback';

export class AuthController{
    async login(req: Request, res: Response){
        try{
            const {username, password} = req.body;

            const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
            const user = (rows as any[])[0];
            if(!user){
                res.status(401).json({ message: "Invalid credentials" });
                return;
            }

            const valid = await bcrypt.compare(password, user.password);
            if(!valid){
                res.status(401).json({ message: "Invalid credentials"});
                return;
            }

            const token = jwt.sign({ userId: user.id}, JWT_SECRET, { expiresIn: '12h'});
            res.json({ token });
        }catch (error){
            console.error("Login error", error);
            res.status(500).json({ message: "Server error"});
            return;
        }
    }

    async register(req: Request, res: Response){
        try{
            const {username, password} = req.body;

            const [rows] = await pool.query("SELECT id FROM users WHERE username = ?", [username]);
            if((rows as any[]).length > 0){
                res.status(409).json({ message: "Username alredy in use" });
                return;
            }

            const hashedPasword = await bcrypt.hash(password,10);

            await pool.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPasword]);

            res.status(201).json({ message: "User registered"});
        }catch (error){
            console.error("Register error", error);
            res.status(500).json({ message: "Server error"});
            return;
        }
    }
}