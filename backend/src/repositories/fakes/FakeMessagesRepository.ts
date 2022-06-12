import mssql from 'mssql';
import SqlServerConfig from '../../config/sqlserverconfig';
import IMessagesRepository from '../IMessagesRepository';

import Message from '../../model/Message';

interface FakeMessage extends Message{
    id: string;
}

interface Chat{
    id: string;
    user1: string;
    user2: string
}

export default class FakeMessagesRepository implements IMessagesRepository{
    private chats: Chat[] = []
    private messages: FakeMessage[] = []
    private chat_id = 1

    constructor(){}
    
    public async createChat(user1: string, user2: string): Promise<any> {
        const id_string = this.chat_id.toString();

        this.chat_id += 1;

        this.chats.push({id: id_string, user1: user1, user2: user2})
    }

    public async getChat(user1: string, user2: string): Promise<any> {
        const findIndex = this.chats.findIndex(findChat => (findChat.user1 == user1 && findChat.user2 == user2) || (findChat.user1 == user2 && findChat.user2 == user1));

        return this.chats[findIndex]
    }

    public async saveMessage(idChat: Number, data: Message): Promise<any> {
        const idString = idChat.toString();

        const newMessage: FakeMessage = {id: idString, message: data.message, sender: data.sender}

        this.messages.push(newMessage)
    }

    public async getUserChats(id: string): Promise<any> {
       const userChats: Chat[] = [];

       this.chats.forEach(function(chat){
        if(chat.user1 === id || chat.user2 === id){
            userChats.push(chat);
        }
        });

        return userChats;
    }

    public async getChatLog(id: string): Promise<any> {
        const chatLog: FakeMessage[] = [];

        this.messages.forEach(function(message){
            if(message.id === id){
                chatLog.push(message);
            }
        });

        return chatLog;
    }
}