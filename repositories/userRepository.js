import { openDb } from "../utils/db.js";

export class UserRepository {
    static async findById(id) {
        const db = await openDb();
        return await db.get("SELECT * FROM users WHERE id = ?", [id]);
    }
    static async getAll() {
        const db = await openDb();
        return await db.all("SELECT * FROM users");
    }
    static async createUseruser(userData) {
        const db = await openDb();
        const { name, email } = userData;
        await db.run("INSERT INTO users (name, email) VALUES (?, ?)", [name, email]);
        const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
        return user;
    }
    static async updateUser(id, userData) {
        const db = await openDb();
        const { name, email } = userData;
        await db.run("UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, id]);
        const user = await db.get("SELECT * FROM users WHERE id = ?", [id]);
        return user;
    }
    static async deleteUser(id) {
        const db = await openDb();
        await db.run("DELETE FROM users WHERE id = ?", [id]);
    }
    static async getUserArticles(id) {
        const db = await openDb();
        const userArticle = await db.all("SELECT * FROM articles WHERE user_id = ?", [id]);
        const user = await db.get("SELECT * FROM users WHERE id = ?", [id]);
        const userArticles = { user, userArticle };
        return userArticles;
    }
}
