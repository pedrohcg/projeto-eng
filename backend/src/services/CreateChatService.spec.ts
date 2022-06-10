import FakeMessagesRepository from "../repositories/fakes/FakeMessagesRepository";
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';
import CreateChatService from "./CreateChatService";

let fakeMessagesRepository: FakeMessagesRepository
let fakeUsersRepository: FakeUsersRepository
let createUser: CreateUserService;
let createChat: CreateChatService

describe('CreateChat', () => {
    beforeEach(() => {
        fakeMessagesRepository = new FakeMessagesRepository();
        fakeUsersRepository = new FakeUsersRepository
        createUser = new CreateUserService(fakeUsersRepository)
        createChat = new CreateChatService(fakeMessagesRepository, fakeUsersRepository);
    });

    it('Should be able to create a new chat', async () =>{
        await createUser.create({name: 'John', email: 'John@example.com', password: 'querty'});
        await createUser.create({name: 'John2', email: 'John2@example.com', password: 'querty'});

        const user1 = await fakeUsersRepository.findById('1')
        const user2 = await fakeUsersRepository.findById('2')

        const response = await createChat.create(user1.id, user2.id);

        expect(response.message).toMatch('Chat iniciado')
    })

    it('Should not be able to create a new chat with unexistent user', async () =>{
        await createUser.create({name: 'John', email: 'John@example.com', password: 'querty'});
        
        const user1 = await fakeUsersRepository.findById('1')

        const response = await createChat.create(user1.id, '2');

        expect(response.message).toMatch('Usuário não encontrado')
    })

})