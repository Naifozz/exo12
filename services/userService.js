import {
    findUserById,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserArticles,
} from "../repositories/userRepository.js";
import { userValidation } from "../utils/validator.js";

// Fonction pour récupérer un utilisateur par son ID
export async function getUser(id) {
    const user = await findUserById(id);
    return user;
}

// Fonction pour récupérer tous les utilisateurs
export async function getAllUsersService() {
    const users = await getAllUsers();
    return users;
}

// Fonction pour créer un utilisateur
export async function createUserService(userData) {
    const validation = await userValidation(userData);
    if (validation !== null) {
        return {
            success: false,
            error: validation,
        };
    } else {
        const user = await createUser(userData);
        return { success: true, data: user };
    }
}

// Fonction pour mettre à jour un utilisateur
export async function updateUserService(id, userData) {
    const validation = await userValidation(userData);
    if (validation !== null) {
        return {
            success: false,
            error: validation,
        };
    } else {
        const user = await updateUser(id, userData);
        return { success: true, data: user };
    }
}

// Fonction pour supprimer un utilisateur
export async function deleteUserService(id) {
    await deleteUser(id);
    return { success: true, message: "User deleted successfully" };
}

// Fonction pour récupérer les articles d'un utilisateur
export async function getUserArticlesService(id) {
    const userArticles = await getUserArticles(id);
    return userArticles;
}
