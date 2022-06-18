import FakeUsersRepository from "../repositories/fakes/FakeUserRepository";
import ResetPasswordService from './ResetPasswordService';
import CreateUserService from './CreateUserService';
import AppError from '../errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let resetPassword: ResetPasswordService
let createUser: CreateUserService

describe('ResetPassword', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        resetPassword = new ResetPasswordService(fakeUsersRepository);
        createUser = new CreateUserService(fakeUsersRepository);
    });

    it('Should be able to reset a user password', async () =>{
        const updatePassword = jest.spyOn(fakeUsersRepository, 'update');

        await createUser.create({name: 'John', email: 'John@example.com', password: 'querty'});

        const newPassword = await resetPassword.execute('John@example.com')
      
        expect(updatePassword).toHaveBeenCalled()
        expect(newPassword).toBeTruthy()
    })

    it('Should not be able to reset a unexisting user password', async () =>{
        expect(resetPassword.execute('John@example.com')).rejects.toBeInstanceOf(AppError);
    })
})