import express from "express";
import { getAllUsersHandler, signInHandler, signUpHandler } from "../../controllers/user.controller";

const userRouter = express.Router();

userRouter.post('/signup', signUpHandler);
userRouter.post('/signin', signInHandler);
userRouter.get('/', getAllUsersHandler);


export default userRouter;