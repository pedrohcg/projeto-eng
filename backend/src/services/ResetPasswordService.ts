import IUsersRepository from '../repositories/IUserRepository'
import AppError from '../errors/AppError'

import generatePassword from 'generate-password'
import {hash} from 'bcrypt'

export default class ResetPasswordService{
    private usersRepository: IUsersRepository

    constructor(usersRepository: IUsersRepository){
        this.usersRepository = usersRepository;
    }

    public async execute(email: string){
        const user = await this.usersRepository.findByEmail(email);

        if(!user){
            return new AppError('Usuário não encontrado', 403);
        }

        const newPassword = await generatePassword.generate({length: 10, numbers: true})
        const hashedPassword = await hash(newPassword, 8)

        user.password = hashedPassword;

        await this.usersRepository.update(user.id, user);

        return {password: newPassword}
    }
}