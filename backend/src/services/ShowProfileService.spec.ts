import FakeUsersRepository from "../repositories/fakes/FakeUserRepository";
import CreateUserService from './CreateUserService';
import ShowProfileService from './ShowProfileService';
import AppError from '../errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let createUser: CreateUserService
let showProfile: ShowProfileService

describe('ShowProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        showProfile = new ShowProfileService(fakeUsersRepository);
        createUser = new CreateUserService(fakeUsersRepository);
    });

    it('Should be able to show a profile', async() => {
        await createUser.create({name: 'John', email: 'John@example.com', password: 'querty'});

        const profile = await showProfile.show('1');

        expect(profile.name).toMatch('John');
        expect(profile.email).toMatch('John@example.com');
    })

    it("Should not have the user's password data", async() => {
        await createUser.create({name: 'John', email: 'John@example.com', password: 'querty'});
        
        const user = await showProfile.show('1');

        expect(user).not.toHaveProperty('password');
    })

    it('Should not be able to show a profile from a non-existing user', async() => {
        expect(showProfile.show('1')).rejects.toBeInstanceOf(AppError);
    })
})