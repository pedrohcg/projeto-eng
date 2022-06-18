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
    const receiver = req.body.receiver;
    const message = req.body.message;

    const messagesRepository = new MessagesRepository();
 
    const sendMessage = new SendMessageService(messagesRepository);

    const response = await sendMessage.create(receiver, {sender, message});
   
    return res.send(response);
});

chatRouter.post('/create/:id', jsonParser, ensureAuthenticated, async(req: Request, res: Response) => {
    const sender = req.user.id;
    const receiver = req.params.id;

    const usersRepository = new UsersRepository();
    const messagesRepository = new MessagesRepository();

    const chatExists = await messagesRepository.getChat(sender, receiver)

    if(!chatExists){
        const createChat = new CreateChatService(messagesRepository, usersRepository);

        await createChat.create(sender, receiver);

        const newChat = await messagesRepository.getChat(sender, receiver)
 
        return res.json(newChat.id);
    }

    return res.json(chatExists.id)
});

chatRouter.get('/', ensureAuthenticated, async(req: Request, res: Response) => {
    const id = req.user.id;

    const messagesRepository = new MessagesRepository();

    const showMessages = new ShowMessagesService(messagesRepository);

    const response = await showMessages.showChats(id);

    return res.send(response)
})

chatRouter.get('/:id', jsonParser, ensureAuthenticated, async(req: Request, res: Response) => {
    const id = req.params.id;

    const messagesRepository = new MessagesRepository();

    const showMessages = new ShowMessagesService(messagesRepository);

    const response = await showMessages.showMessage(id);

    return res.send(response)
})

export default chatRouter;