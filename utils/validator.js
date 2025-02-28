import { UserRepository } from "../repositories/userRepository.js";

export class Validator {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async articleValidation(article) {
        const errors = [];
        if (!article.title || article.title.length < 3) {
            errors.push("Title must be at least 3 characters");
        }
        if (!article.content || article.content.length < 10) {
            errors.push("Content must be at least 10 characters");
        }
        if (!article.user_id) {
            errors.push("User ID is required");
        }
        return errors.length > 0 ? errors : null;
    }

    async userValidation(user) {
        const errors = [];
        if (!user.name || user.name.length < 3) {
            errors.push("Name must be at least 3 characters");
        }
        if (!user.email || user.email.length < 3) {
            errors.push("Email must be at least 3 characters");
        }
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(user.email)) {
            errors.push("Invalid email format");
        }

        // Vérification de l'existence de l'utilisateur par email
        const existingUser = await this.userRepository.existingUser(user.email);
        if (existingUser !== undefined) {
            errors.push("Email already exists");
        }

        return errors.length > 0 ? errors : null;
    }
}
