import IUsersRepository from 'repositories/IUserRepository';

import User from '../model/User';
import AppError from '../errors/AppError';
import { hash } from 'bcrypt';


interface IRequest{
    name: string;
    email: string;
    password: string;
}

export default class CreateUserService{
    private usersRepository: IUsersRepository

    constructor(usersRepository: IUsersRepository){
        this.usersRepository = usersRepository;
    }

    public async create({name, email, password}: IRequest) {
        const newUser = new User(name, email, password);

        const userExists = await this.usersRepository.findByEmail(newUser.email);

        if(userExists){
            throw new AppError('Email já em uso', 409);
        }

        const hashedPassword = await hash(newUser.password, 8);

        newUser.password = hashedPassword;

        await this.usersRepository.create(newUser);

        return {message: 'Usuário criado com sucesso'};
    }
}