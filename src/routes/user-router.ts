import express from "express";
import { UserController } from "../controllers/user-controller";
import { authMiddleware } from "../middlewares/auth-middleware";

export const userRouter : express.Router = express.Router();
userRouter.get('/me', authMiddleware, UserController.getMe);
userRouter.post('/login', UserController.login);
userRouter.post('/refresh', UserController.refresh);
userRouter.post('/register', UserController.register);


