import {
    findArticleById,
    getAllArticles,
    createArticle,
    updateArticle,
    deleteArticle,
} from "../repositories/articleRepository.js";
import { articleValidation } from "../utils/validator.js";

// Fonction pour récupérer un article par son ID
export async function getArticle(id) {
    const article = await findArticleById(id);
    return article;
}

// Fonction pour récupérer tous les articles
export async function getAll() {
    const articles = await getAllArticles();
    return articles;
}

// Fonction pour créer un article
export async function createArticleService(articleData) {
    const validation = await articleValidation(articleData);
    if (validation !== null) {
        return {
            success: false,
            error: validation,
        };
    } else {
        const article = await createArticle(articleData);
        return { success: true, data: article };
    }
}

// Fonction pour mettre à jour un article
export async function updateArticleService(id, articleData) {
    const validation = await articleValidation(articleData);
    if (validation !== null) {
        return {
            success: false,
            error: validation,
        };
    } else {
        const article = await updateArticle(id, articleData);
        return { success: true, data: article };
    }
}

// Fonction pour supprimer un article
export async function deleteArticleService(id) {
    await deleteArticle(id);
    return { success: true, message: "Article deleted successfully" };
}
