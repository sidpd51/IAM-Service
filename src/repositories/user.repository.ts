import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";
import { prisma } from "../prisma/client";
import { ConflictError } from "../utils/errors/app.error";
import bcrypt from 'bcrypt';
import { serverConfig } from "../config";

export const createUser = async (userData: Prisma.UserUncheckedCreateInput) => {
    try {
        userData.password = await bcrypt.hash(userData.password, serverConfig.SALT_ROUNDS);

        const { password, ...restAttributes } = await prisma.user.create({
            data: userData
        });

        return restAttributes;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                throw new ConflictError(`There is a unique constraint violation, a new user cannot be created with this email`);
            }
        }
        if (error instanceof PrismaClientValidationError) {
            if (error.message.includes("Argument `email` is missing.")) {
                throw new ConflictError(`Email field is missing`);
            };
            if (error.message.includes("Argument `password` is missing.")) {
                throw new ConflictError(`Password field is missing`);
            };
        }
    }
}