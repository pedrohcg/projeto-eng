import FakeUsersRepository from "../repositories/fakes/FakeUserRepository";
import CreateUserService from './CreateUserService';
import AppError from '../errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let createUser: CreateUserService

describe('CreateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        createUser = new CreateUserService(fakeUsersRepository);
    });

    it('Should be able to create a new user', async () =>{
        const user = await createUser.create({name: 'John', email: 'John@example.com', password: 'querty'});
      
        expect(user.message).toMatch('Usuário criado com sucesso')
    })

    it('Should not be able to create two users with the same email', async () => {
        await createUser.create({name: 'John', email: 'John@example.com', password: 'querty'});
        
        expect(createUser.create({name: 'John', email: 'John@example.com', password: 'querty'})).rejects.toBeInstanceOf(AppError);
    })
})