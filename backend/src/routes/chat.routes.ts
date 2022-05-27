import {Request, Response, Router} from 'express';
import bodyParser from 'body-parser';
import ensureAuthenticated from '../middlewares/authenticate';

import UsersRepository from '../repositories/UserRepository';
import MessagesRepository from '../repositories/MessagesRepository';

import CreateChatService from '../services/CreateChatService';
import SendMessageService from '../services/SendMessageService';
import ShowMessagesService from '../services/ShowMessagesService';

const jsonParser = bodyParser.json();
const chatRouter = Router();

chatRouter.post('/', jsonParser, ensureAuthenticated, async(req: Request, res: Response) => {
    const sender = req.user.id;
    const receiver = req.body.id;
    const message = req.body.message;

    const usersRepository = new UsersRepository();
    const messagesRepository = new MessagesRepository();

    const chatExists = await messagesRepository.getChat(sender, receiver)

    if(!chatExists){
        const createChat = new CreateChatService(messagesRepository, usersRepository);

        await createChat.create(sender, receiver);
    }

    const sendMessage = new SendMessageService(messagesRepository);

    const response = await sendMessage.create(receiver, {sender, message});
 
    return res.send(response);
});

chatRouter.get('/', jsonParser, ensureAuthenticated, async(req: Request, res: Response) => {
    const id = req.body.id;

    const messagesRepository = new MessagesRepository();

    const showMessages = new ShowMessagesService(messagesRepository);

    const response = await showMessages.execute(id);

    return res.send(response)
})

export default chatRouter;