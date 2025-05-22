import { Request, Response } from "express";
import { MenuService } from "../services/MenuService";

export class MenuController{
    private service = new MenuService();

    async getAll(req: Request, res: Response){
        const items = await this.service.getAll();
        res.json(items);
    }

    async getById(req: Request, res: Response){
        const id = Number(req.params.id);
        const item = await this.service.getById(id);
        if(item) res.json(item);
        else res.status(404).json({ message: "Item not found"});
    }

    async create(req: Request, res: Response){
        const { name, description, price } = req.body;
        const newItem = await this.service.create(name, description, price);
        res.status(201).json(newItem);
    }
}