import { Prisma } from "@prisma/client";
import { createUser, getAllUsers } from "../repositories/user.repository";

export const createUserService = async (user: Prisma.UserCreateInput) => {
    try {
        const newUser = await createUser(user);
        return newUser;
    } catch (error) {
        throw error;
    }
}

export const getAllUsersService = async () => {
    try {
        const users = await getAllUsers();
        return users;
    } catch (error) {
        throw error;
    }
}