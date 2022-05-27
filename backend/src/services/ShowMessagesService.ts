import AppError from '../errors/AppError';
import IMessagesRepository from '../repositories/IMessagesRepository';

export default class ShowMessagesService{
    private messagesRepository: IMessagesRepository

    constructor(messagesRepository: IMessagesRepository){
        this.messagesRepository = messagesRepository;
    }

    public async execute(id: string){
        const chat = await this.messagesRepository.getChatLog(id);

        if(!chat){
            return new AppError('Erro interno', 500);
        }

        return chat;
    }
}