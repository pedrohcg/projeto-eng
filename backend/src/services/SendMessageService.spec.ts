import FakeMessagesRepository from "../repositories/fakes/FakeMessagesRepository";
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';
import CreateChatService from "./CreateChatService";
import SendMessageService from './SendMessageService';

let fakeMessagesRepository: FakeMessagesRepository
let fakeUsersRepository: FakeUsersRepository
let createUser: CreateUserService;
let createChat: CreateChatService;
let sendMessage: SendMessageService;

describe('CreateChat', () => {
    beforeEach(() => {
        fakeMessagesRepository = new FakeMessagesRepository();
        fakeUsersRepository = new FakeUsersRepository();
        createUser = new CreateUserService(fakeUsersRepository);
        createChat = new CreateChatService(fakeMessagesRepository, fakeUsersRepository);
        sendMessage = new SendMessageService(fakeMessagesRepository);
    });

    it('Should be able to send a message', async () =>{
        await createUser.create({name: 'John', email: 'John@example.com', password: 'querty'});
        await createUser.create({name: 'John2', email: 'John2@example.com', password: 'querty'});

        const user1 = await fakeUsersRepository.findById('1')
        const user2 = await fakeUsersRepository.findById('2')

        await createChat.create(user1.id, user2.id);

        const response = await sendMessage.create(user1.id, {sender: user2.id, message: 'aaaa'})

        expect(response.message).toMatch('Mensagem salva');
    })

    it('Should not be able to send a message without a chat', async () =>{
        await createUser.create({name: 'John', email: 'John@example.com', password: 'querty'});
        await createUser.create({name: 'John2', email: 'John2@example.com', password: 'querty'});

        const user1 = await fakeUsersRepository.findById('1')
        const user2 = await fakeUsersRepository.findById('2')

        const response = await sendMessage.create(user1.id, {sender: user2.id, message: 'aaaa'})

        expect(response.message).toMatch('Erro interno');
    })
})