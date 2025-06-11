import express from "express";
import { signInHandler } from "../../controllers/user.controller";

const userRouter = express.Router();

userRouter.post('/', signInHandler);


export default userRouter;