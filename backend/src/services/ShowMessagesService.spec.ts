import FakeMessagesRepository from "../repositories/fakes/FakeMessagesRepository";
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';
import CreateChatService from "./CreateChatService";
import SendMessageService from './SendMessageService';
import ShowMessagesService from './ShowMessagesService';

let fakeMessagesRepository: FakeMessagesRepository
let fakeUsersRepository: FakeUsersRepository
let createUser: CreateUserService;
let createChat: CreateChatService
let sendMessage: SendMessageService;
let showMessage: ShowMessagesService;

describe('ShowMessages', () => {
    beforeEach(() => {
        fakeMessagesRepository = new FakeMessagesRepository();
        fakeUsersRepository = new FakeUsersRepository
        createUser = new CreateUserService(fakeUsersRepository)
        createChat = new CreateChatService(fakeMessagesRepository, fakeUsersRepository);
        sendMessage = new SendMessageService(fakeMessagesRepository);
        showMessage = new ShowMessagesService(fakeMessagesRepository);
    });

    it('Should be able to show user messages', async () =>{
        await createUser.create({name: 'John', email: 'John@example.com', password: 'querty'});
        await createUser.create({name: 'John2', email: 'John2@example.com', password: 'querty'});

        const user1 = await fakeUsersRepository.findById('1')
        const user2 = await fakeUsersRepository.findById('2')

        await createChat.create(user1.id, user2.id);

        await sendMessage.create(user1.id, {sender: user2.id, message: 'aaaa'})

        const response = await showMessage.showMessage('1')
       
        expect(response[0].message).toMatch('aaaa')
    })

    
    it('Should be able to show user chats', async () =>{
        await createUser.create({name: 'John', email: 'John@example.com', password: 'querty'});
        await createUser.create({name: 'John2', email: 'John2@example.com', password: 'querty'});

        const user1 = await fakeUsersRepository.findById('1')
        const user2 = await fakeUsersRepository.findById('2')

        await createChat.create(user1.id, user2.id);

        const response = await showMessage.showChats('1')
       
        expect(response).toHaveLength(1)
    })
})