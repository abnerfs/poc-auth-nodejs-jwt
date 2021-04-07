import bcrypt from 'bcrypt';

export class PasswordService {
    public static hashPassword(pass: string) : string {
        return bcrypt.hashSync(pass, 10);
    }

    public static verifyPassword(pass: string, encrypted: string) : boolean {
        return bcrypt.compareSync(pass, encrypted);
    }
}