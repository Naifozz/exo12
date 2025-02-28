import { ArticleRepository } from "../repositories/articleRepository.js";
import { Validator } from "../utils/validator.js";

export class ArticleService {
    constructor() {
        this.articleRepository = new ArticleRepository();
        this.validator = new Validator();
    }

    async getArticle(id) {
        const article = await this.articleRepository.findById(id);
        return article;
    }

    async getAll() {
        const articles = await this.articleRepository.getArticles();
        return articles;
    }

    async createArticle(articleData) {
        const validation = await this.validator.articleValidation(articleData);
        if (validation !== null) {
            return {
                success: false,
                error: validation,
            };
        } else {
            const article = await this.articleRepository.createArticle(articleData);
            return { success: true, data: article };
        }
    }

    async updateArticle(id, articleData) {
        const validation = await this.validator.articleValidation(articleData);
        if (validation !== null) {
            return {
                success: false,
                error: validation,
            };
        } else {
            const article = await this.articleRepository.updateArticle(id, articleData);
            return { success: true, data: article };
        }
    }

    async deleteArticle(id) {
        const article = await this.articleRepository.deleteArticle(id);
        return article;
    }
}
