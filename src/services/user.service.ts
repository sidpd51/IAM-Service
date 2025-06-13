import { Prisma } from "@prisma/client";
import bcrypt from 'bcrypt';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { UUIDTypes } from "uuid";
import { serverConfig } from "../config";
import { DecodedToken, signInDto, UserHasRoleDto } from "../dto/user.dto";
import { createUser, getAllUsers, getUserByEmail, getUserRolesById } from "../repositories/user.repository";
import { BadRequestError, InternalServerError, NotFoundError, UnauthorizedError } from "../utils/errors/app.error";

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

        return createToken(user.id);

    } catch (error) {
        throw error;
    }
}

export const comparePwd = async (plainPwd: string, hashPwd: string) => {
    try {
        return bcrypt.compareSync(plainPwd, hashPwd);
    } catch (error) {
        throw new InternalServerError("Error in ComparePwd Service");
    }
}

export const createToken = (id: UUIDTypes) => {
    try {
        const token = jwt.sign({ id }, serverConfig.JWT_SECRET, { expiresIn: "1hr" });
        return token;
    } catch (error) {
        throw new InternalServerError("Error in createToken Service");
    }
}

export const verifyToken = async (token: string) => {
    try {
        const decoded = jwt.verify(token, serverConfig.JWT_SECRET) as DecodedToken;
        return decoded;
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            throw new UnauthorizedError("Authentication token has expired");
        }
        if (error instanceof JsonWebTokenError) {
            throw new BadRequestError("Malformed authentication token");
        }
    }
}

export const userHasRole = async (payload: UserHasRoleDto) => {
    try {
        const user = await verifyToken(payload.token);
        if (!user) {
            throw new NotFoundError(`User doesn't exist`);
        }
        const roles = await getUserRolesById(user.id);
        const hasRole = roles.some((role) => role.role.name === payload.role);
        return hasRole;
    } catch (error) {
        throw error;
    }
}
