import jwt from 'jsonwebtoken';

const JWT_KEY = process.env.JWT_KEY || '';
if (!JWT_KEY)
    throw new Error('JWT_KEY not found');

export class JwtService {
    public static sign = (payload: any, expiresIn: string) : Promise<string> =>
        new Promise((resolve, reject) => {
            jwt.sign(payload, JWT_KEY, {
                expiresIn
            }, (err, token) => {
                if (err)
                    reject(err)
                else
                    resolve(token || '')
            })
        });

    public static verify = (token: string) : Promise<any> => 
        new Promise((resolve, reject) => {
            jwt.verify(token, JWT_KEY, (err, decoded) => {
                if (err)
                    reject(err)
                else
                    resolve(decoded)
            });
        })
    }
