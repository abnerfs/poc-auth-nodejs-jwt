

export class BadRequestError extends Error {
    message = '';
    type = 'BadRequestError';

    constructor(message: string) {
        super(message);
        this.message = message;
    }
}