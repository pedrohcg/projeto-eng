import FakeUsersRepository from "../repositories/fakes/FakeUserRepository";
import CreateUserService from './CreateUserService';

import User from '../model/User';
import AppError from '../errors/AppError';

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
        const user = await createUser.create({name: 'John', email: 'John@example.com', password: 'querty'});

        expect((await createUser.create({name: 'John', email: 'John@example.com', password: 'querty'})).message).toMatch('Email já em uso')
    })
})