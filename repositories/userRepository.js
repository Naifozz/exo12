import { openDb } from "../utils/db.js";

// Fonction pour trouver un utilisateur par son ID
export async function findUserById(id) {
    const db = await openDb();
    return await db.get("SELECT * FROM users WHERE id = ?", [id]);
}

// Fonction pour récupérer tous les utilisateurs
export async function getAllUsers() {
    const db = await openDb();
    return await db.all("SELECT * FROM users");
}

// Fonction pour créer un utilisateur
export async function createUser(userData) {
    const db = await openDb();
    const { name, email } = userData;
    await db.run("INSERT INTO users (name, email) VALUES (?, ?)", [name, email]);
    const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
    return user;
}

// Fonction pour mettre à jour un utilisateur
export async function updateUser(id, userData) {
    const db = await openDb();
    const { name, email } = userData;
    await db.run("UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, id]);
    const user = await db.get("SELECT * FROM users WHERE id = ?", [id]);
    return user;
}

// Fonction pour supprimer un utilisateur
export async function deleteUser(id) {
    const db = await openDb();
    await db.run("DELETE FROM users WHERE id = ?", [id]);
}

// Fonction pour récupérer les articles d'un utilisateur
export async function getUserArticles(id) {
    const db = await openDb();
    const userArticle = await db.all("SELECT * FROM articles WHERE user_id = ?", [id]);
    const user = await db.get("SELECT * FROM users WHERE id = ?", [id]);
    const userArticles = { user, userArticle };
    return userArticles;
}

// Fonction pour vérifier si un utilisateur existe par son email
export async function existingUser(email) {
    const db = await openDb();
    const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
    return user;
}
