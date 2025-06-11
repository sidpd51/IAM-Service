import express from "express";
import { getAllUsersHandler, signInHandler } from "../../controllers/user.controller";

const userRouter = express.Router();

userRouter.post('/', signInHandler);
userRouter.get('/', getAllUsersHandler);


export default userRouter;