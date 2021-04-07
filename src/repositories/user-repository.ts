import { UserModel } from "../models/user-model";
import { getConnection } from "../services/storage-service";


export class UserRepository {
    public static async registerUser(user: UserModel) {
        const query = `
            INSERT INTO T_Users (user_name, user_email, user_pass)
            VALUES(?, ?, ?);

            SELECT LAST_INSERT_ID() as insert_id;
        `
        const connection = getConnection();
        const [ rows ] = await connection.query(query, [user.user_name, user.user_email, user.user_pass]) as any[]; 
        return rows[0].insert_id;
    }

    public static async getUser(user_id: number): Promise<UserModel | null> {
        const query = `
            SELECT user_id, user_name, user_email, user_pass FROM T_users WHERE user_id = ?
        `;

        const connection = getConnection();
        const [rows] = await connection.query(query, [user_id]) as any[];
        if (!rows.length)
            return null;

        const user = rows[0] as UserModel;
        return user;
    }

    public static async getUserByEmail(email: number): Promise<UserModel | null> {
        const query = `
            SELECT user_id, user_name, user_email, user_pass FROM T_users WHERE user_email = ?
        `;

        const connection = getConnection();
        const [rows] = await connection.query(query, [email]) as any[];
        if (!rows.length)
            return null;

        const user = rows[0] as UserModel;
        return user;
    }

}