import express from "express";
import { BadRequestError } from "../models/errors";

export class BaseController {

    constructor() {

    }

    public static handleError(res: express.Response, err: any) {
        if (err.type === 'BadRequestError') {
            return BaseController.badRequest(res, err as BadRequestError);
        }
        return BaseController.internalError(res, err as Error);
    }

    public static getUserId(res: express.Response) {
        const user_id = parseInt(res.locals.user_id);
        return user_id;
    }

    public static badRequest(res: express.Response, error: any) {
        return res.status(400)
            .json({
                message: error.message,
                error: true
            });
    }


    public static unauthorized(res: express.Response) {
        return res.sendStatus(401);
    }


    public static internalError(res: express.Response, error: Error) {
        if(process.env.NODE_ENV === 'production')
            return res.sendStatus(500);

        return res.status(500)
            .json({
                message: error.message,
                stack: error.stack,
                error: true
            });
    }
}