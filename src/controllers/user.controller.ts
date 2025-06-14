import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { logger } from "../config/logger.config";
import { addRoleToUserService, createUserService, getAllUsersService, signInService, userHasRole } from "../services/user.service";
import { BadRequestError, ConflictError, InternalServerError, NotFoundError, UnauthorizedError } from "../utils/errors/app.error";

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
            logger.error(`Error in signUpHandler: ${error.message}`);
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
            logger.error(`Error in getAllUsersHandler: ${error.message}`);
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
            logger.error(`Error in signInHanlder: ${error.message}`);
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
                data: {},
            });
        }
    }
}

export const hasRoleHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            throw new NotFoundError("Token not found");
        }
        const role = req.body.role;
        const result = await userHasRole({ token, role });
        res.status(StatusCodes.OK).json({
            success: true,
            message: `User ${!result ? "doesnt't have" : "has"} ${req.body.role} role`,
            data: result
        });
    } catch (error) {
        if (error instanceof BadRequestError || error instanceof UnauthorizedError || error instanceof NotFoundError) {
            logger.error(`Error in hasRoleHandler: ${error.message}`);
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
                data: {},
            });
        }
    }
}

export const AddRoleHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await addRoleToUserService(req.body);
        res.status(StatusCodes.OK).json({
            success: true,
            message: `${req.body.role} role has been assigned to user with id: ${req.body.userId}`,
            data: {}
        });
    } catch (error) {
        if (error instanceof BadRequestError || error instanceof UnauthorizedError || error instanceof NotFoundError || error instanceof ConflictError) {
            logger.error(`Error in AddRoleHandler: ${error.message}`);
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
                data: {},
            });
        }
    }
}