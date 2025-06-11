import { NextFunction, Request, Response } from "express";
import { createUserService } from "../services/user.service";
import { ConflictError } from "../utils/errors/app.error";

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