import { openDb } from "../utils/db.js";

// Fonction pour trouver un article par son ID
export async function findArticleById(id) {
    const db = await openDb();
    return await db.get("SELECT * FROM articles WHERE id = ?", [id]);
}

// Fonction pour récupérer tous les articles
export async function getAllArticles() {
    const db = await openDb();
    return await db.all("SELECT * FROM articles");
}

// Fonction pour créer un article
export async function createArticle(articleData) {
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

// Fonction pour mettre à jour un article
export async function updateArticle(id, articleData) {
    const db = await openDb();
    const { title, content } = articleData;
    await db.run("UPDATE articles SET title = ?, content = ? WHERE id = ?", [title, content, id]);
    const article = await db.get("SELECT * FROM articles WHERE id = ?", [id]);
    return article;
}

// Fonction pour supprimer un article
export async function deleteArticle(id) {
    const db = await openDb();
    await db.run("DELETE FROM articles WHERE id = ?", [id]);
}
