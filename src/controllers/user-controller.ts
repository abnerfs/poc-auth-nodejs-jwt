import express from "express";
import { BadRequestError } from "../models/errors";
import { userResponseFactory } from "../models/user-model";
import { UserRepository } from "../repositories/user-repository";
import { JwtService } from "../services/jwt-service";
import { PasswordService } from "../services/password-service";
import { BaseController } from "./base-controller";


export class UserController extends BaseController {
    public static async register(req: express.Request, res: express.Response) {
        try {
            let { email, name, password } = req.body;

            {
                email = email?.trim() || '';
                if (!email)
                    throw new BadRequestError('invalid e-mail');

                let alreadyRegistered = await UserRepository.getUserByEmail(email);
                if (alreadyRegistered)
                    throw new BadRequestError('e-mail already registered');
            }

            if (!name)
                throw new BadRequestError('invalid name');

            if (!password)
                throw new BadRequestError('invalid password');

            const hashedPass = PasswordService.hashPassword(password);

            const user_id = await UserRepository.registerUser({
                user_email: email,
                user_id: 0,
                user_name: name,
                user_pass: hashedPass
            });

            const userCreated = await UserRepository.getUser(user_id);
            return res.status(201).json(userCreated);
        }
        catch (err) {
            return super.handleError(res, err);
        }
    }

    public static async getMe({}: express.Request, res: express.Response) {
        try {
            const user_id = res.locals.user_id;
            const user = await UserRepository.getUser(user_id);
            if(!user)
                throw new Error("invalid user");

            const response = userResponseFactory(user);
            return res.json(response);
        }
        catch(err) {
            return super.handleError(res, err);
        }
    }

    public static async refresh(req: express.Request, res: express.Response) {
        try {
            const refresh_token = req.headers.authorization?.replace('Bearer ', '').trim();
            const decoded = await JwtService.verify(refresh_token || '');
            if(!decoded.refresh_token)
                throw new Error();

            const access_token = await JwtService.sign({
                user_id: decoded.user_id,
                access_token: true
            }, '5 minutes');

            return res.json({
                access_token,
                refresh_token
            });

        }
        catch(err) {
            return res.sendStatus(401);
        }
    }

    public static async login(req: express.Request, res: express.Response) {
        try {
            const { email, password } = req.body;

            const user = await UserRepository.getUserByEmail(email);
            if (!user)
                throw new BadRequestError(`user not found`);

            if (!PasswordService.verifyPassword(password, user.user_pass))
                throw new BadRequestError(`Invalid username or password`);

            const access_token = await JwtService.sign({
                user_id: user.user_id,
                access_token: true
            }, '5 minutes');

            const refresh_token = await JwtService.sign({
                user_id: user.user_id,
                refresh_token: true
            }, '9999 years');

            return res.json({
                access_token,
                refresh_token
            });
        }
        catch (err) {
            return super.handleError(res, err);
        }
    }
}