import { openDb } from "../utils/db.js";
import { logError } from "../utils/logger.js";
export async function handleUsersRequest(req, res) {
    switch (req.method) {
        case "GET":
            if (req.url === "/users") {
                const url = new URL(req.url, `http://${req.headers.host}`);
                // Verifie s'il y a des parametre dans l'url
                const limit = parseInt(url.searchParams.get("limit"), 10) || 10;
                const page = parseInt(url.searchParams.get("page"), 10) || 1;
                await getAllUsers(req, res, limit, page);
            } else if (req.url.match(/^\/users\/\d+\/articles(\?.*)?$/)) {
                const url = new URL(req.url, `http://${req.headers.host}`);
                const limit = parseInt(url.searchParams.get("limit"), 10) || 10;
                const page = parseInt(url.searchParams.get("offset"), 10) || 1;
                const id = req.url.split("/")[2];

                await getUserArticles(req, res, id, limit, page);
            } else if (req.url.startsWith("/userstats/")) {
                const id = req.url.split("/")[2];
                await getUserStats(req, res, id);
            } else {
                const id = req.url.split("/")[2];
                await getUsersById(req, res, id);
            }
            break;
        case "POST":
            if (req.url === "/users") {
                await createUsers(req, res, req.body);
            } else {
                res.writeHead(405);
                res.end(JSON.stringify({ error: "Invalid URL for POST request" }));
            }
            break;
        case "PUT":
            if (req.url.startsWith("/users/")) {
                const id = req.url.split("/")[2];
                await updateUsers(req, res, id, req.body);
            } else {
                res.writeHead(405);
                res.end(JSON.stringify({ error: "Invalid URL for PUT request" }));
            }
            break;
        case "DELETE":
            if (req.url.startsWith("/users/")) {
                const id = req.url.split("/")[2];
                await deleteUsers(req, res, id);
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
