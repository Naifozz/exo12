import { logError } from "../utils/logger.js";
import {
    getUser,
    getAllUsersService,
    createUserService,
    updateUserService,
    deleteUserService,
    getUserArticlesService,
} from "../services/userService.js";

export async function handleUsersRequest(req, res) {
    switch (req.method) {
        case "GET":
            if (req.url === "/users") {
                // Récupérer tous les utilisateurs
                const users = await getAllUsersService();
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(users));
            } else if (req.url.match(/^\/users\/\d+\/articles(\?.*)?$/)) {
                // Récupérer les articles d'un utilisateur
                const id = req.url.split("/")[2];
                const userArticles = await getUserArticlesService(id);
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(userArticles));
            } else if (req.url.startsWith("/users/")) {
                // Récupérer un utilisateur par son ID
                const id = req.url.split("/")[2];
                const user = await getUser(id);
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(user));
            } else {
                res.writeHead(405);
                res.end(JSON.stringify({ error: "Invalid URL for GET request" }));
            }
            break;
        case "POST":
            if (req.url === "/users") {
                try {
                    // Créer un nouvel utilisateur
                    const userData = req.body;
                    const result = await createUserService(userData);
                    if (!result.success) {
                        res.writeHead(400, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({ error: result.error }));
                    } else {
                        res.writeHead(201, { "Content-Type": "application/json" });
                        res.end(
                            JSON.stringify({
                                message: "User created successfully",
                                user: result.data,
                            })
                        );
                    }
                } catch (error) {
                    await logError(error);
                    res.writeHead(500, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: error }));
                }
            } else {
                res.writeHead(405);
                res.end(JSON.stringify({ error: "Invalid URL for POST request" }));
            }
            break;
        case "PUT":
            if (req.url.startsWith("/users/")) {
                try {
                    // Mettre à jour un utilisateur
                    const id = req.url.split("/")[2];
                    const userData = req.body;
                    const result = await updateUserService(id, userData);
                    if (!result.success) {
                        res.writeHead(400, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({ error: result.error }));
                    } else {
                        res.writeHead(200, { "Content-Type": "application/json" });
                        res.end(
                            JSON.stringify({
                                message: "User updated successfully",
                                user: result.data,
                            })
                        );
                    }
                } catch (error) {
                    await logError(error);
                    res.writeHead(500, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: "Erreur lors du PUT" }));
                }
            } else {
                res.writeHead(405);
                res.end(JSON.stringify({ error: "Invalid URL for PUT request" }));
            }
            break;
        case "DELETE":
            if (req.url.startsWith("/users/")) {
                // Supprimer un utilisateur
                const id = req.url.split("/")[2];
                const result = await deleteUserService(id);
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(
                    JSON.stringify({
                        message: "User deleted successfully",
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
