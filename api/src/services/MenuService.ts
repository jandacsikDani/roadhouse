import pool from "../shared/db";

export class MenuService{
    async getFoodTypes(){
        return (await pool.query("SELECT * FROM menutypes") as any[])[0];
    }

    async getAll(){
        return (await pool.query("SELECT * FROM menuitems") as any[])[0];
    }

    async getById(id: number){
        return (await pool.query("SELECT * FROM menuitems WHERE id = ?", [id]) as any[])[0];
    }

    async create(typeid: number, name: string, description: string, price: string){
        return (await pool.query("INSERT INTO menuItems (typeid, name, description, price) VALUES (?, ?, ?, ?)", [typeid, name, description, price]))[0];
    }

    async getFoodsByTypeId(typeid: number){
        return (await pool.query("SELECT * FROM menuitems WHERE typeid = ?", [typeid]) as any[])[0];
    }

    async deleteFood(id: number){
        return (await pool.query("DELETE FROM menuitems WHERE id = ?", [id]) as any[])[0];
    }

    async updateFood(id: number, updatedFields: Partial<{name: string, description: string, price: string}>){
        const updates = [];
        const values = [];

        if (updatedFields.name !== undefined) {
            updates.push("name = ?");
            values.push(updatedFields.name);
        }

        if (updatedFields.description !== undefined) {
            updates.push("description = ?");
            values.push(updatedFields.description);
        }

        if (updatedFields.price !== undefined) {
            updates.push("price = ?");
            values.push(updatedFields.price);
        }

        values.push(id);

        const sql = `UPDATE menuItems SET ${updates.join(", ")} WHERE id = ?`;
        return await pool.query(sql, values);
    }
}