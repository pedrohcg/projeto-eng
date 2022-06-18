import FakeUsersRepository from "../repositories/fakes/FakeUserRepository";
import AuthenticateUserService from "./AuthenticateUserService";
import CreateUserService from './CreateUserService';
import AppError from '../errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let authenticateUser: AuthenticateUserService
let createUser: CreateUserService

describe('AuthenticateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        authenticateUser = new AuthenticateUserService(fakeUsersRepository);
        createUser = new CreateUserService(fakeUsersRepository);
    });

    it('Should be able to authenticate', async () =>{
        await createUser.create({name: 'John', email: 'John@example.com', password: 'querty'});
        
        const response = await authenticateUser.execute({email: 'John@example.com', password: 'querty'});

        expect(response).toHaveProperty('token')
    })

    it('Should not be able to authenticate with wrong password', async () =>{
        expect(authenticateUser.execute({email: 'John@example.com', password: 'querty12'})).rejects.toBeInstanceOf(AppError);
    })

    it('Should not be able to authenticate with non existing user', async () =>{
       expect(authenticateUser.execute({email: 'John@example.com', password: 'querty12'})).rejects.toBeInstanceOf(AppError);
    })
})