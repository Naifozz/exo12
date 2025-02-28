import { logError } from "../utils/logger.js";
import { UserService } from "../services/userService.js";

export async function handleUsersRequest(req, res) {
    switch (req.method) {
        case "GET":
            if (req.url === "/users") {
                const users = await UserService.getAllUsers();
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(users));
            } else if (req.url.match(/^\/users\/\d+\/articles(\?.*)?$/)) {
                const id = req.url.split("/")[2];
                const userArticles = await UserService.getUserArticles(id);
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(userArticles));
            } else if (req.url.startsWith("/users/")) {
                const id = req.url.split("/")[2];
                const user = await UserService.getUser(id);
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
                    const userData = req.body;
                    const createdUser = await UserService.createUser(userData);
                    res.writeHead(201, { "Content-Type": "application/json" });
                    res.end(
                        JSON.stringify({
                            message: "User created successfully",
                            user: createdUser,
                        })
                    );
                } catch (error) {
                    await logError(error);
                    res.writeHead(500, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: "Erreur lors du POST" }));
                }
            } else {
                res.writeHead(405);
                res.end(JSON.stringify({ error: "Invalid URL for POST request" }));
            }
            break;
        case "PUT":
            if (req.url.startsWith("/users/")) {
                try {
                    const id = req.url.split("/")[2];
                    const userData = req.body;
                    const modifiedUser = await UserService.updateUser(id, userData);
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(
                        JSON.stringify({
                            message: "User updated successfully",
                            user: modifiedUser,
                        })
                    );
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
                const id = req.url.split("/")[2];
                const deletedUser = await UserService.deleteUser(id);
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(
                    JSON.stringify({
                        message: "User deleted successfully",
                        user: deletedUser,
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
