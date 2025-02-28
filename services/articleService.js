import { ArticleRepository } from "../repositories/articleRepository.js";
import { Validator } from "../utils/validator.js";

export class ArticleService {
    static async getArticle(id) {
        const article = await ArticleRepository.findById(id);
        return article;
    }
    static async getAll() {
        const articles = await ArticleRepository.getArticles();
        return articles;
    }
    static async createArticle(articleData) {
        const validation = await Validator.articleValidation(articleData);
        if (validation !== null) {
            return {
                success: false,
                error: validation,
            };
        } else {
            const article = await ArticleRepository.createArticle(articleData);
            return { success: true, data: article };
        }
    }
    static async updateArticle(id, articleData) {
        const validation = await Validator.articleValidation(articleData);
        if (validation !== null) {
            return {
                success: false,
                error: validation,
            };
        } else {
            const article = await ArticleRepository.updateArticle(id, articleData);
            return { success: true, data: article };
        }
    }
    static async deleteArticle(id) {
        const article = await ArticleRepository.deleteArticle(id);
        return article;
    }
}
