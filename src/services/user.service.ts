import { Prisma } from "@prisma/client";
import { createUser } from "../repositories/user.repository";

export const createUserService = async (user: Prisma.UserCreateInput) => {
    try {
        const newUser = await createUser(user);
        return newUser;
    } catch (error) {
        throw error;
    }
}