import express from "express";
import { getAllUsersHandler, signInHandler, signUpHandler } from "../../controllers/user.controller";
import { validateRequetBody } from "../../validators";
import { signInSchema, signUpSchema } from "../../validators/user.validator";

const userRouter = express.Router();

userRouter.post('/signup', validateRequetBody(signUpSchema), signUpHandler);
userRouter.post('/signin', validateRequetBody(signInSchema), signInHandler);
userRouter.get('/', getAllUsersHandler);


export default userRouter;