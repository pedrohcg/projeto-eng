import { Request, Response, NextFunction } from 'express';
import pkg from 'jsonwebtoken';
import AppError from '../errors/AppError';
import authConfig from '../config/auth';

const {verify} = pkg;

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function confirmToken(req: Request, res: Response, next: NextFunction): void{
    const authHeader = req.headers.authorization;

    if(!authHeader){
        throw new AppError('Usuário não autenticado', 404);
    }

    const [, token] = authHeader.split(' ');

    try{
        const decoded = verify(token, authConfig.jwt.secret);

        const {sub} = decoded as ITokenPayload;

        req.user = {id: sub}

        return next();
    } catch(err){
        throw new AppError('Token JWT inválido', 404);
    }
}