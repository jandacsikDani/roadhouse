import { Request, Response } from "express";
import { MenuService } from "../services/MenuService";

export class MenuController{
    private service = new MenuService();

    async getFoodTypes(req: Request, res: Response){
        const items = await this.service.getFoodTypes();
        res.json(items);
    }

    async getAll(req: Request, res: Response){
        const items = await this.service.getAll();
        res.json(items);
    }

    async getById(req: Request, res: Response){
        const id = Number(req.params.id);
        try{
            const items = await this.service.getById(id);
            res.json(items);
        }catch(error){
            res.status(404).json({ message: "Item not found", error: error});
        }
    }

    async create(req: Request, res: Response){
        const { typeid, name, description, price } = req.body;
        const newItem = await this.service.create(Number(typeid), name, description, price);
        res.status(201).json(newItem);
    }

    async getFoodsByTypeId(req: Request, res: Response){
        const id = Number(req.params.id);
        const items = await this.service.getFoodsByTypeId(id);
        //if(items.length == 0) res.status(404).json({ message: "Food type dosent exits"});
        //else res.json(items);
    }

    async deleteFood(req: Request, res: Response){
        try{
            await this.service.deleteFood(Number(req.params.id));
            res.status(200).json({message: "Sikeres törlés"});
        }catch (error){
            res.status(500).json({message: "Sikertelen törlés", error: error});
        }
    }

    async updateFood(req: Request, res: Response){
        const id = Number(req.params.id);
        const {name, description, price} = req.body;
        try{
            await this.service.updateFood(id, {name, description, price});
            res.status(200).json({message: "Termék frissítve"});
        }
        catch(error){
            res.status(500).json({message: "A termék frissítése sikretelen", error: error});
        }
    }
}