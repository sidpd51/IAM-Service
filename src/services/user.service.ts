import { Prisma } from "@prisma/client";
import { createUser, getAllUsers, getUserByEmail } from "../repositories/user.repository";
import { signInDto } from "../dto/user.dto";
import bcrypt from 'bcrypt';
import { InternalServerError, NotFoundError, UnauthorizedError } from "../utils/errors/app.error";
import jwt from 'jsonwebtoken';
import { serverConfig } from "../config";

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

export const signInService = async (credentials: signInDto) => {
    try {
        const user = await getUserByEmail(credentials.email);
        if (!user) {
            throw new NotFoundError(`User doesn't found with email: ${credentials.email}`);
        }
        const result = await comparePwd(credentials.password, user.password);

        if (!result) {
            throw new UnauthorizedError("Invalid password!");
        }

        return createToken(credentials);

    } catch (error) {
        throw error;
    }
}

const comparePwd = async (plainPwd: string, hashPwd: string) => {
    try {
        return bcrypt.compareSync(plainPwd, hashPwd);
    } catch (error) {
        throw new InternalServerError("Error in ComparePwd Service");
    }
}

const createToken = (credentials: signInDto) => {
    try {
        const token = jwt.sign(credentials, serverConfig.JWT_SECRET, { expiresIn: '1h' });
        return token;
    } catch (error) {
        throw new InternalServerError("Error in createToken Service");
    }
}
