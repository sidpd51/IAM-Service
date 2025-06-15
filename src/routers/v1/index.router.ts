import express from 'express';
import userRouter from './user.router';
import { validateRequetBody } from '../../validators';
import { signInSchema, signUpSchema } from '../../validators/user.validator';
import { signInHandler, signUpHandler } from '../../controllers/user.controller';

const v1Router = express.Router();

userRouter.post('/signup', validateRequetBody(signUpSchema), signUpHandler);
userRouter.post('/signin', validateRequetBody(signInSchema), signInHandler);
v1Router.use('/users', userRouter);

export default v1Router;