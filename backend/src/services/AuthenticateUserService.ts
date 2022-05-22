import { sign } from 'jsonwebtoken';
import AppError from '../errors/AppError';
import authConfig from '../config/auth';
import IUsersRepository from '../repositories/IUserRepository';
import { compare } from 'bcrypt';

interface IRequest{
    email: string;
    password: string;
}

interface IResponse{
    username: string;
    token: string;
}

export default class AuthenticateUserService{
    private usersRepository: IUsersRepository

    constructor(usersRepository: IUsersRepository){
        this.usersRepository = usersRepository;
    }

    public async execute({email, password}: IRequest): Promise<AppError|IResponse>{
        try{
            const user = await this.usersRepository.findByEmail(email);

            if(!user){
                return new AppError('Email/senha incorretos', 403);
            }
            
            const passwordMatched = await compare(password, user.password)

            if(!passwordMatched){
                return new AppError('Email/senha incorretos', 403);
            }

            const {secret, expiresIn} = authConfig.jwt;

            const token = sign({}, secret, {subject: user.id.toString(), expiresIn});

            return {username: user.name, token: token}
        }catch(err){
            console.log(err);
            return new AppError('Erro interno', 500)
        }
    }
}

