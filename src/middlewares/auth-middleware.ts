import express from 'express';
import { JwtService } from '../services/jwt-service';

export const authMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
        const token = req.headers.authorization?.toString().replace('Bearer ', '').trim();

        const decoded = await JwtService.verify(token || '');
        if(!decoded.access_token) 
            throw new Error();

        res.locals.user_id = decoded.user_id;
        next();
    }
    catch(err) {
        res.sendStatus(401);
    }
}