import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createUserService, getAllUsersService, signInService } from "../services/user.service";
import { ConflictError, InternalServerError, NotFoundError, UnauthorizedError } from "../utils/errors/app.error";

export const signUpHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await createUserService(req.body);
        res.status(StatusCodes.CREATED).json({
            success: true,
            message: "User created successfully",
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
        res.status(StatusCodes.OK).json({
            success: true,
            message: "Got all users successfully",
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

export const signInHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // res.status(StatusCodes.NOT_IMPLEMENTED).send("Not yet implemented");
        const token = await signInService(req.body);

        res.status(StatusCodes.OK).json({ token });
    } catch (error) {
        if (error instanceof UnauthorizedError || error instanceof NotFoundError || error instanceof InternalServerError) {
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
                data: {},
            });
        }
        console.log(error);
    }
}