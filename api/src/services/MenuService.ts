import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class MenuService{
    async getAll(){
        return prisma.menuItems.findMany();
    }

    async getById(id: number){
        return prisma.menuItems.findUnique({ where: { id }});
    }

    async create(name: string, description: string, price: number){
        return prisma.menuItems.create({
            data: {name, description, price}
        });
    }
}