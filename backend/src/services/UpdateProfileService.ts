import AppError from '../errors/AppError';
import IUsersRepository from '../repositories/IUserRepository';
import { hash, compare } from 'bcrypt';

interface IRequest{
    user_id: string;
    name: string;
    email: string;
    old_password?: string;
    password?: string;
}

export default class UpdateProfileServie{
    private usersRepository: IUsersRepository;

    constructor(usersRepository: IUsersRepository){
        this.usersRepository = usersRepository
    }

    public async execute({user_id, name, email, old_password, password}: IRequest): Promise<AppError>{
        const user = await this.usersRepository.findById(user_id);
        
        if(!user){
            return new AppError('Email/senha incorretos', 403);
        }

        const verifyEmail = await this.usersRepository.findByEmail(email);

        if(verifyEmail && verifyEmail.id !== user_id){
            return new AppError('Email já em uso', 409);
        }

        if(name){
            user.name = name;
        }
        
        if(email){
            user.email = email;
        }

        if(password && !old_password){
            return new AppError('Senha antiga incorreta');
        }

        if(password && old_password){
            const passwordMatches = await compare(old_password, user.password);

            if(!passwordMatches){
                return new AppError('Senha antiga incorreta');
            }
        }

        if(password){
            user.password = await hash(password, 8);
        }

        await this.usersRepository.update(user_id, user);

        return new AppError('Informações atualizadas com sucesso', 200);
    }
}
