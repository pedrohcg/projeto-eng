import AppError from '../errors/AppError';
import IMessagesRepository from '../repositories/IMessagesRepository';
import IUsersRepository from '../repositories/IUserRepository';

interface IRequest{
    sender: string;
    message: string;
}

export default class SendMessageService{
    private messagesRepository: IMessagesRepository;

    constructor(messagesRepository: IMessagesRepository){
        this.messagesRepository = messagesRepository;
    }

    public async create(receiver: string, {sender, message}: IRequest){
        const chat = await this.messagesRepository.getChat(sender, receiver);
       
        if(!chat){
            return new AppError('Erro interno', 500);
        }
        
        await this.messagesRepository.saveMessage(chat.id, {message: message, sender: sender});

        return {message: 'Mensagem salva'};
    }
}