import { UserRepository } from "../repositories/userRepository.js";

export class UserService {
    static async getUser(id) {
        const user = await UserRepository.findById(id);
        return user;
    }
    static async getAllUsers() {
        const user = await UserRepository.getAll();
        return user;
    }
    static async createUser(UserData) {
        const user = await UserRepository.createUser(UserData);
        return user;
    }
    static async updateUser(id, userData) {
        const user = await UserRepository.updateUser(id, userData);
        return user;
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
