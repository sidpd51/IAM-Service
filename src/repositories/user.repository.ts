import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";
import bcrypt from 'bcrypt';
import { serverConfig } from "../config";
import { prisma } from "../prisma/client";
import { ConflictError, InternalServerError, NotFoundError } from "../utils/errors/app.error";

const userPublicFields = {
    id: true,
    email: true,
    name: true,
    createdAt: true,
    updatedAt: true,
};

export const createUser = async (userData: Prisma.UserUncheckedCreateInput) => {
    try {
        userData.password = await bcrypt.hash(userData.password, serverConfig.SALT_ROUNDS);
        const { password, ...restAttributes } = await prisma.user.create({
            data: {
                ...userData,
                roles: {
                    create: [
                        {
                            isAdmin: false,
                            assignedAt: new Date(),
                            role: {
                                connectOrCreate: {
                                    where: { name: "user" },
                                    create: {
                                        name: "user",
                                        description: "Regular app user with access to browse, book, and attend fitness sessions, track progress, and manage their profile and subscriptions.",
                                    }
                                }
                            }
                        }
                    ]
                },
            }
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

export const getUserByEmail = async (email: string) => {
    try {
        const user = prisma.user.findUnique({
            where: {
                email
            },
            select: {
                password: true,
                id: true
            }
        });
        return user;
    } catch (error) {
        throw new InternalServerError("Something went wrong in getUserByEmail");
    }
}

export const getAllUsers = async () => {
    try {
        const users = prisma.user.findMany({
            select: userPublicFields
        });
        return users;
    } catch (error) {
        throw new InternalServerError("Something went wrong in getAllUsers");
    }
}

export const getUserRolesById = async (id: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                email: true,
                name: true,
                roles: {
                    select: {
                        role: {
                            select: {
                                name: true
                            }
                        },
                        isAdmin: true
                    }
                },
            },
        });
        if (!user) {
            throw new NotFoundError(`User doesn't exist with id: ${id}`);
        }
        return user.roles;
    } catch (error) {
        throw error;
    }
}

export const findUserById = async (userId: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true
            }
        });

        if (!user) {
            throw new NotFoundError(`User doesn't exist with id: ${userId}`);
        }
        return user;
    } catch (error) {
        throw error;
    }
}

