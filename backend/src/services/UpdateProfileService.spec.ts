import FakeUsersRepository from "../repositories/fakes/FakeUserRepository";
import CreateUserService from './CreateUserService';
import UpdateProfileService from './UpdateProfileService';
import { compare } from 'bcrypt';

let fakeUsersRepository: FakeUsersRepository
let createUser: CreateUserService
let updateProfile: UpdateProfileService

describe('CreateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        updateProfile = new UpdateProfileService(fakeUsersRepository);
        createUser = new CreateUserService(fakeUsersRepository);
    });

    it('Should be able to update profile', async () =>{
        await createUser.create({name: 'John', email: 'John@example.com', password: 'querty'});

        const updateTest = await updateProfile.execute({user_id: '1', name: 'John Doe', email: 'Johndoe@example.com'})
      
        expect(updateTest.message).toMatch('Informações atualizadas com sucesso')
    })

    it('Should be able to update the password', async () =>{
        await createUser.create({name: 'John', email: 'John@example.com', password: 'querty'});

        await updateProfile.execute({user_id: '1', name: 'John', email: 'John@example.com', password: 'john', old_password: 'querty'})

        const updatedUser = await fakeUsersRepository.findById('1');
      
        expect(compare('john', updatedUser.password)).toBeTruthy();
    })

    it('Should not be able to change to another user email', async () =>{
        await createUser.create({name: 'John', email: 'John@example.com', password: 'querty'});
        await createUser.create({name: 'John Doe', email: 'Johndoe@example.com', password: 'querty'});

        const updateTest = await updateProfile.execute({user_id: '1', name: 'John Doe', email: 'Johndoe@example.com'})
      
        expect(updateTest.message).toMatch('Email já em uso')
    })


    it('Should not be able to update the password without the old one', async () =>{
        await createUser.create({name: 'John', email: 'John@example.com', password: 'querty'});

        const updateTest = await updateProfile.execute({user_id: '1', name: 'John', email: 'John@example.com', password: 'john'})
      
        expect(updateTest.message).toMatch('Senha antiga incorreta');
    })

    it('Should not be able to update the password with a wrong old password', async () =>{
        await createUser.create({name: 'John', email: 'John@example.com', password: 'querty'});

        const updateTest = await updateProfile.execute({user_id: '1', name: 'John', email: 'John@example.com', password: 'john', old_password: 'macacada'})
      
        expect(updateTest.message).toMatch('Senha antiga incorreta');
    })
})