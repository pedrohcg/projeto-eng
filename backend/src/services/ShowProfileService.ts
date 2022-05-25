import AppError from '../errors/AppError';
import IUsersRepository from 'repositories/IUserRepository';

export default class ShowProfileService{
    private usersRepository: IUsersRepository;

    constructor(usersRepository: IUsersRepository){
        this.usersRepository = usersRepository;
    }

    public async show(user_id: string){
        const user = await this.usersRepository.findById(user_id);
    
        if(!user){
            return new AppError('Usuário não autenticado', 401);
        }

        delete user.password;

        return user;
    }
}