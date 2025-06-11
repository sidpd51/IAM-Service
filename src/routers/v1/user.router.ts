import express from "express";
import { createUserHandler } from "../../controllers/user.controller";

const userRouter = express.Router();

userRouter.post('/', createUserHandler);


export default userRouter;