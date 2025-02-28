import { openDb } from "../utils/db.js";

export class UserRepository {
    async findById(id) {
        const db = await openDb();
        return await db.get("SELECT * FROM users WHERE id = ?", [id]);
    }

    async getAll() {
        const db = await openDb();
        return await db.all("SELECT * FROM users");
    }

    async createUser(userData) {
        const db = await openDb();
        const { name, email } = userData;
        await db.run("INSERT INTO users (name, email) VALUES (?, ?)", [name, email]);
        const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
        return user;
    }

    async updateUser(id, userData) {
        const db = await openDb();
        const { name, email } = userData;
        await db.run("UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, id]);
        const user = await db.get("SELECT * FROM users WHERE id = ?", [id]);
        return user;
    }

    async deleteUser(id) {
        const db = await openDb();
        await db.run("DELETE FROM users WHERE id = ?", [id]);
    }

    async getUserArticles(id) {
        const db = await openDb();
        const userArticle = await db.all("SELECT * FROM articles WHERE user_id = ?", [id]);
        const user = await db.get("SELECT * FROM users WHERE id = ?", [id]);
        const userArticles = { user, userArticle };
        return userArticles;
    }

    async existingUser(email) {
        const db = await openDb();
        const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
        return user;
    }
}
