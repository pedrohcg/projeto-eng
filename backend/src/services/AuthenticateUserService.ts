import { sign } from 'jsonwebtoken';
import AppError from '../errors/AppError';
import authConfig from '../config/auth';
import IUsersRepository from '../repositories/IUserRepository';
import User from '../model/User'
import { compare } from 'bcrypt';

interface IRequest{
    email: string;
    password: string;
}

interface Users extends User{
    id: string;
}

interface IResponse{
    user: Users;
    token: string;
}

export default class AuthenticateUserService{
    private usersRepository: IUsersRepository

    constructor(usersRepository: IUsersRepository){
        this.usersRepository = usersRepository;
    }

    public async execute({email, password}: IRequest): Promise<IResponse>{
        const user = await this.usersRepository.findByEmail(email);

        if(!user){
            throw new AppError('Email/senha incorretos', 400);
        }
        
        const passwordMatched = await compare(password, user.password)

        if(!passwordMatched){
            throw new AppError('Email/senha incorretos', 400);
        }

        const {secret, expiresIn} = authConfig.jwt;

        const token = sign({}, secret, {subject: user.id.toString(), expiresIn});

        return {user, token};       
    }
}

