import { openDb } from "../utils/db.js";

export class ArticleRepository {
    async findById(id) {
        const db = await openDb();
        return await db.get("SELECT * FROM articles WHERE id = ?", [id]);
    }

    async getAll() {
        const db = await openDb();
        return await db.all("SELECT * FROM articles");
    }

    async createArticle(articleData) {
        const db = await openDb();
        const { title, content, user_id } = articleData;
        await db.run("INSERT INTO articles (title, content, user_id) VALUES (?, ?, ?)", [
            title,
            content,
            user_id,
        ]);
        const article = await db.get("SELECT * FROM articles WHERE title = ?", [title]);
        return article;
    }

    async updateArticle(id, articleData) {
        const db = await openDb();
        const { title, content } = articleData;
        await db.run("UPDATE articles SET title = ?, content = ? WHERE id = ?", [
            title,
            content,
            id,
        ]);
        const article = await db.get("SELECT * FROM articles WHERE id = ?", [id]);
        return article;
    }

    async deleteArticle(id) {
        const db = await openDb();
        await db.run("DELETE FROM articles WHERE id = ?", [id]);
    }
}
