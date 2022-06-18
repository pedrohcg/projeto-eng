import mssql from 'mssql';
import SqlServerConfig from '../config/sqlserverconfig';
import IMessagesRepository from './IMessagesRepository';

import Message from '../model/Message';

export default class MessagesRepository implements IMessagesRepository{
    constructor(){}

    public async createChat(user1: string, user2: string): Promise<any> {
        const id1 = Number(user1);
        const id2 = Number(user2);

        await mssql.connect(SqlServerConfig);

        await mssql.query(`INSERT INTO Chat (user1, user2) VALUES (${id1}, ${id2})`);
    }

    public async getChat(user1: string, user2: string): Promise<any> {
        const id1 = Number(user1);
        const id2 = Number(user2);

        await mssql.connect(SqlServerConfig);
        
        const chat = await mssql.query(`SELECT id FROM Chat where (user1 = ${id1} and user2 = ${id2}) or (user1 = ${id2} and user2 = ${id1})`);
   
        return chat.recordset[0];
    }

    public async saveMessage(idChat: Number, data: Message): Promise<any> {
        const id = Number(data.sender);

        await mssql.connect(SqlServerConfig);

        await mssql.query(`INSERT INTO Message (id, sender, message, date) VALUES (${idChat}, ${id}, '${data.message}', dateadd(hour, -3, getDate()))`)
    }

    public async getUserChats(id: string): Promise<any> {
        await mssql.connect(SqlServerConfig);

        const chats = await mssql.query(`SELECT c.id, u.name, c.user2 seller from CHAT c
                                        INNER JOIN users (NOLOCK) u
                                        ON c.user2 = u.id
                                        WHERE user1 = ${id}
                                        UNION ALL
                                        SELECT c.id, u.name, c.user1 seller from CHAT c
                                        INNER JOIN users (NOLOCK) u
                                        ON c.user1 = u.id
                                        WHERE user2 = ${id}`)

        return chats.recordset;
    }

    public async getChatLog(id: string): Promise<any> {
        await mssql.connect(SqlServerConfig);

        const chatLog = await mssql.query(`SELECT U.name sender, M.message 
                                            from Chat (NOLOCK) C
                                            INNER JOIN Message (NOLOCK) M
                                            ON C.id = M.id
                                            INNER JOIN Users (NOLOCK) U
                                            ON M.sender = U.id
                                            WHERE C.id = ${id}
                                            ORDER BY M.date ASC`);

        return chatLog.recordset;
    }
}