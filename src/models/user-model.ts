
export interface UserModel {
    user_id: number;
    user_name: string;
    user_pass: string;
    user_email: string;
}


export interface UserResponse {
    user_id: number;
    user_name: string;
    user_email: string;
}

export const userResponseFactory = (user: UserModel) : UserResponse => {
    return {
        user_id: user.user_id,
        user_name: user.user_name,
        user_email: user.user_email
    };
}