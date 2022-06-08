import Message from '../model/Message';

export default interface IMessagesRepository{
    createChat(user1: string, user2: string): Promise<any>;
    getChat(user1: string, user2: string): Promise<any>;
    saveMessage(idChat:Number, data: Message): Promise<any>;
    getUserChats(id: string): Promise<any>;
    getChatLog(id: string): Promise<any>;
}