import { logError } from "../utils/logger.js";
import { ArticleService } from "../services/articleService.js";

export async function handleArticleRequest(req, res) {
    switch (req.method) {
        case "GET":
            if (req.url === "/articles") {
                const articles = await ArticleService.getAllArticles();
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(articles));
            } else if (req.url.startsWith("/articles/")) {
                const id = req.url.split("/")[2];
                const article = await ArticleService.getArticle(id);
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(article));
            } else {
                res.writeHead(405);
                res.end(JSON.stringify({ error: "Invalid URL for GET request" }));
            }
            break;
        case "POST":
            if (req.url === "/articles") {
                try {
                    const articleData = req.body;
                    const result = await ArticleService.createArticle(articleData);
                    if (!result.success) {
                        res.writeHead(400, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({ error: result.error }));
                    } else {
                        res.writeHead(201, { "Content-Type": "application/json" });
                        res.end(
                            JSON.stringify({
                                message: "Article created successfully",
                                article: result.data,
                            })
                        );
                    }
                } catch (error) {
                    await logError(error);
                    res.writeHead(500, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: "Erreur lors du post" }));
                }
            } else {
                res.writeHead(405);
                res.end(JSON.stringify({ error: "Invalid URL for POST request" }));
            }
            break;
        case "PUT":
            if (req.url.startsWith("/articles/")) {
                try {
                    const id = req.url.split("/")[2];
                    const articleData = req.body;
                    const result = await ArticleService.updateArticle(id, articleData);
                    if (!result.success) {
                        res.writeHead(400, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({ error: result.error }));
                    } else {
                        res.writeHead(200, { "Content-Type": "application/json" });
                        res.end(
                            JSON.stringify({
                                message: "Article updated successfully",
                                article: result.data,
                            })
                        );
                    }
                } catch (error) {
                    await logError(error);
                    res.writeHead(500, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: "Erreur lors du put" }));
                }
            } else {
                res.writeHead(405);
                res.end(JSON.stringify({ error: "Invalid URL for PUT request" }));
            }
            break;
        case "DELETE":
            if (req.url.startsWith("/articles/")) {
                const id = req.url.split("/")[2];
                const deletedArticle = await ArticleService.deleteArticle(id);
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(
                    JSON.stringify({
                        message: "Article deleted successfully",
                        article: deletedArticle,
                    })
                );
            } else {
                res.writeHead(405);
                res.end(JSON.stringify({ error: "Invalid URL for DELETE request" }));
            }
            break;
        default:
            res.writeHead(405);
            res.end(JSON.stringify({ error: "Method Not Allowed" }));
    }
}
