declare namespace Express {
    export interface Request { // adiciona a variavel user_id ao tipo Request do Express
        user_id: string;
    }
}