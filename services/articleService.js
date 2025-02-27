import { ArticleRepository } from "../repositories/articleRepository.js";

export class ArticleService {
    static async getArticle(id) {
        const article = await ArticleRepository.findById(id);
        return article;
    }
    static async getAllArticles() {
        const articles = await ArticleRepository.getArticles();
        return articles;
    }
    static async createArticle(articleData) {
        const article = await ArticleRepository.createArticle(articleData);
        return article;
    }
    static async updateArticle(id, articleData) {
        const article = await ArticleRepository.updateArticle(id, articleData);
        return article;
    }
    static async deleteArticle(id) {
        const article = await ArticleRepository.deleteArticle(id);
        return article;
    }
}
