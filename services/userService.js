import { UserRepository } from "../repositories/userRepository.js";
import { Validator } from "../utils/validator.js";

export class UserService {
    static async getUser(id) {
        const user = await UserRepository.findById(id);
        return user;
    }
    static async getAllUsers() {
        const user = await UserRepository.getAll();
        return user;
    }
    static async createUser(userData) {
        const validation = await Validator.userValidation(userData);
        if (validation !== null) {
            return {
                success: false,
                error: validation,
            };
        } else {
            const user = await UserRepository.createUser(userData);
            return { success: true, data: user };
        }
    }
    static async updateUser(id, userData) {
        const validation = await Validator.userValidation(userData);
        if (validation !== null) {
            return {
                success: false,
                error: validation,
            };
        } else {
            const user = await UserRepository.updateUser(id, articleData);
            return { success: true, data: user };
        }
    }
    static async deleteUser(id) {
        const user = await UserRepository.deleteUser(id);
        return user;
    }
    static async getUserArticles(id) {
        const userArticles = await UserRepository.getUserArticles(id);
        return userArticles;
    }
}
