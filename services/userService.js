import { UserRepository } from "../repositories/userRepository.js";
import { Validator } from "../utils/validator.js";

export class UserService {
    constructor() {
        this.userRepository = new UserRepository();
        this.validator = new Validator();
    }

    async getUser(id) {
        const user = await this.userRepository.findById(id);
        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.getAll();
        return users;
    }

    async createUser(userData) {
        const validation = await this.validator.userValidation(userData);
        if (validation !== null) {
            return {
                success: false,
                error: validation,
            };
        } else {
            const user = await this.userRepository.createUser(userData);
            return { success: true, data: user };
        }
    }

    async updateUser(id, userData) {
        const validation = await this.validator.userValidation(userData);
        if (validation !== null) {
            return {
                success: false,
                error: validation,
            };
        } else {
            const user = await this.userRepository.updateUser(id, userData);
            return { success: true, data: user };
        }
    }

    async deleteUser(id) {
        const user = await this.userRepository.deleteUser(id);
        return user;
    }

    async getUserArticles(id) {
        const userArticles = await this.userRepository.getUserArticles(id);
        return userArticles;
    }
}
