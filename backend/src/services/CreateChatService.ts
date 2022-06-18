import AppError from '../errors/AppError';
import IMessagesRepository from '../repositories/IMessagesRepository';
import IUsersRepository from '../repositories/IUserRepository';

export default class CreateChatService{
    private messagesRepository: IMessagesRepository;
    private usersRepository: IUsersRepository;

    constructor(messagesRepository: IMessagesRepository, usersRepository: IUsersRepository){
        this.messagesRepository = messagesRepository;
        this.usersRepository = usersRepository;
    }

    public async create(sender: string, receiver: string){
        const user1 = await this.usersRepository.findById(sender);

        if(!user1){
            throw new AppError('Usuário não encontrado', 404);
        }

        const user2 = await this.usersRepository.findById(receiver);

        if(!user2){
            throw new AppError('Usuário não encontrado', 404);
        }

        await this.messagesRepository.createChat(sender, receiver);

        return {message: 'Chat iniciado'};
    }
}