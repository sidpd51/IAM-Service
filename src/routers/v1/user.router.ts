import express from "express";
import { AddRoleHandler, getAllUsersHandler, hasRoleHandler } from "../../controllers/user.controller";
import { validateRequetBody } from "../../validators";
import { AddRoleSchema, hasRoleSchema } from "../../validators/user.validator";

const userRouter = express.Router();

userRouter.get('/', getAllUsersHandler);
userRouter.post('/hasrole', validateRequetBody(hasRoleSchema), hasRoleHandler);
userRouter.post('/addrole', validateRequetBody(AddRoleSchema), AddRoleHandler);


export default userRouter;