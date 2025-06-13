import express from "express";
import { getAllUsersHandler, signInHandler, signUpHandler, hasRoleHandler, AddRoleHandler } from "../../controllers/user.controller";
import { validateRequetBody } from "../../validators";
import { AddRoleSchema, hasRoleSchema, signInSchema, signUpSchema } from "../../validators/user.validator";

const userRouter = express.Router();

userRouter.get('/', getAllUsersHandler);
userRouter.post('/signup', validateRequetBody(signUpSchema), signUpHandler);
userRouter.post('/signin', validateRequetBody(signInSchema), signInHandler);
userRouter.post('/hasrole', validateRequetBody(hasRoleSchema), hasRoleHandler);
userRouter.post('/addrole', validateRequetBody(AddRoleSchema), AddRoleHandler);


export default userRouter;