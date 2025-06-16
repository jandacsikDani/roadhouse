import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class MenuService{
    async getFoodTypes(){
        return prisma.menuTypes.findMany();
    }

    async getAll(){
        return prisma.menuItems.findMany();
    }

    async getById(id: number){
        return prisma.menuItems.findUnique({ where: { id }});
    }

    async create(typeid: number, name: string, description: string, price: string){
        return prisma.menuItems.create({
            data: {typeid, name, description, price}
        });
    }

    async getFoodsByTypeId(typeid: number){
        return prisma.menuItems.findMany({ where: { typeid }});
    }

    async deleteFood(id: number){
        return prisma.menuItems.delete({where: {id}});
    }

    async updateFood(id: number, updatedFilds: Partial<{name: string, description: string, price: string}>){
        return await prisma.menuItems.update({ where: {id}, data: updatedFilds});
    }
}