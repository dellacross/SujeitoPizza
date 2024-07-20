import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
    sub: string
}

// middleware utilizado em toda requisicao que eh necessario validacao de token
export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization

    if(!authToken) return res.status(401).end()

    const [, token] = authToken.split(" ")

    try {

        const { sub } = verify(token, process.env.JWT_SECRET) as Payload

        // recuperar id do token e coloca dentro da variavel user_id dentro do request
        req.user_id = sub;

        return next()

    } catch(err) {
        return res.status(401).end()
    }
}