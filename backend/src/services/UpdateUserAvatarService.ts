import path from 'path'
import fs from 'fs'
import uploadConfig from '../config/uploadConfig'
import AppError from '../errors/AppError'
import IUsersRepository from '../repositories/IUserRepository';

interface IRequest{
    user_id: string;
    avatarFilename: string;
}

export default class UpdateUserAvatarService{
    private usersRepository: IUsersRepository;

    constructor(usersRepository: IUsersRepository){
        this.usersRepository = usersRepository;
    }

    public async execute({user_id, avatarFilename}: IRequest): Promise<AppError>{
        const user = await this.usersRepository.findById(user_id);

        if(!user){
            return new AppError('Usuário não autenticado', 401);
        }

        //excluir arquivo
    }
}

