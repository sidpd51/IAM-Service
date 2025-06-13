import express from "express";
import { getAllUsersHandler, signInHandler, signUpHandler, hasRoleHandler } from "../../controllers/user.controller";
import { validateRequetBody } from "../../validators";
import { hasRoleSchema, signInSchema, signUpSchema } from "../../validators/user.validator";

const userRouter = express.Router();

userRouter.get('/', getAllUsersHandler);
userRouter.post('/signup', validateRequetBody(signUpSchema), signUpHandler);
userRouter.post('/signin', validateRequetBody(signInSchema), signInHandler);
userRouter.post('/hasrole', validateRequetBody(hasRoleSchema), hasRoleHandler);


export default userRouter;