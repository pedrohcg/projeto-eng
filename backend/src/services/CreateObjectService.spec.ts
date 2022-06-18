import path from 'path';

import FakeUsersRepository from "../repositories/fakes/FakeUserRepository";
import FakeObjectsRepository from "../repositories/fakes/FakeObjectsRepository";
import CreateObjectService from './CreateObjectService';
import AppError from '../errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let fakeObjectsRepository: FakeObjectsRepository
let createObject: CreateObjectService

describe('CreateObject', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeObjectsRepository = new FakeObjectsRepository();
        createObject = new CreateObjectService(fakeObjectsRepository);
    });

    it('Should be able to create a new object', async () =>{
        const response = await createObject.create('1', {name: 'smartphone', price: 3000, description: 'Latest smartphone available', category: '1', image: ''});
      
        expect(response.message).toMatch('Item cadastrado com sucesso')
    })

    it('Should return default image if none is passed', async () =>{
        await createObject.create('1', {name: 'smartphone', price: 3000, description: 'Latest smartphone available', category: '1', image: ''});

        const object = await fakeObjectsRepository.findById('1');

        expect(object.image).toMatch("https://upload.wikimedia.org/wikipedia/commons/2/20/Point_d_interrogation.jpg")
    })

    it('Should not be able to create a new item with negative price', async () =>{
        expect(createObject.create('1', {name: 'smartphone', price: -3000, description: 'Latest smartphone available', category: '1', image: ''})).rejects.toBeInstanceOf(AppError);
    })
})

