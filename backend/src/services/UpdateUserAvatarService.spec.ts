import FakeUsersRepository from "../repositories/fakes/FakeUserRepository";
import FakeFilesRepository from "../repositories/fakes/FakeFilesRepository";
import CreateUserService from './CreateUserService';
import UpdateUserAvatarService from "./UpdateUserAvatarService";

let fakeUsersRepository: FakeUsersRepository
let fakeFilesRepository: FakeFilesRepository
let updateUserAvatar: UpdateUserAvatarService
let createUser: CreateUserService

describe('UpdateUserAvatar', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeFilesRepository = new FakeFilesRepository()
        createUser = new CreateUserService(fakeUsersRepository);
        updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeFilesRepository);
    });

    it('Should be able to update user avatar', async() => {
        const user = await fakeUsersRepository.create({name: 'John', email: 'John@example.com', password: 'querty', avatar: ''});

        await updateUserAvatar.execute({user_id: '1', avatarFilename: 'avatar.png'});
        
        expect(user.avatar).toBe('avatar.png');
    })

    it('Should delete the old avatar when uploading a new one', async() => {
        const deleteFile = jest.spyOn(fakeFilesRepository, 'delete');

        const user = await fakeUsersRepository.create({name: 'John', email: 'John@example.com', password: 'querty', avatar: ''});

        await updateUserAvatar.execute({user_id: '1', avatarFilename: 'avatar.png'});
     
        const response = await updateUserAvatar.execute({user_id: '1', avatarFilename: 'avatar2.png'});
       
        expect(deleteFile).toBeCalledWith('avatar.png')
        expect(response.message).toMatch('Avatar alterado com sucesso');
    })

    it('Should not be able to update a non-existing user avatar', async() => {
        const response = await updateUserAvatar.execute({user_id: '1', avatarFilename: 'avatar.png'});

        expect(response.message).toMatch('Usuário não autenticado');
    })


})