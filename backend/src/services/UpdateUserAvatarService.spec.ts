import FakeUsersRepository from "../repositories/fakes/FakeUserRepository";
import CreateUserService from './CreateUserService';
import UpdateUserAvatarService from "./UpdateUserAvatarService";

let fakeUsersRepository: FakeUsersRepository
let updateUserAvatarService: UpdateUserAvatarService
let createUser: CreateUserService

describe('CreateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        //updateUserAvatarService = new UpdateUserAvatarService(fakeUsersRepository);
        createUser = new CreateUserService(fakeUsersRepository);
    });
})