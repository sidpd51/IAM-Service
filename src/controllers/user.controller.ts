import { NextFunction, Request, Response } from "express";
import { createUserService, getAllUsersService } from "../services/user.service";
import { ConflictError, InternalServerError } from "../utils/errors/app.error";

export const signInHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await createUserService(req.body);
        res.status(201).json({
            data: user
        });
    } catch (error) {
        if (error instanceof ConflictError) {
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
                data: {},
            });
        }
    }
}

export const getAllUsersHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await getAllUsersService();
        res.status(201).json({
            data: users
        });
    } catch (error) {
        if (error instanceof InternalServerError) {
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
                data: {},
            });
        }
    }
}