import { logError } from "../utils/logger.js";
import {
    getArticle,
    getAll,
    createArticleService,
    updateArticleService,
    deleteArticleService,
} from "../services/articleService.js";

export async function handleArticleRequest(req, res) {
    switch (req.method) {
        case "GET":
            if (req.url === "/articles") {
                // Récupérer tous les articles
                const articles = await getAll();
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(articles));
            } else if (req.url.startsWith("/articles/")) {
                // Récupérer un article par son ID
                const id = req.url.split("/")[2];
                const article = await getArticle(id);
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
                    // Créer un nouvel article
                    const articleData = req.body;
                    const result = await createArticleService(articleData);
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
                    // Mettre à jour un article
                    const id = req.url.split("/")[2];
                    const articleData = req.body;
                    const result = await updateArticleService(id, articleData);
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
                // Supprimer un article
                const id = req.url.split("/")[2];
                const result = await deleteArticleService(id);
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(
                    JSON.stringify({
                        message: "Article deleted successfully",
                        data: result,
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
