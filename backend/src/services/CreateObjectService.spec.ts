import path from 'path';

import FakeUsersRepository from "../repositories/fakes/FakeUserRepository";
import FakeObjectsRepository from "../repositories/fakes/FakeObjectsRepository";
import CreateObjectService from './CreateObjectService';

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
        const response = await createObject.create('1', {name: 'smartphone', price: 3000, description: 'Latest smartphone available', image: ''});
      
        expect(response.message).toMatch('Item cadastrado com sucesso')
    })

    it('Should return default image if none is passed', async () =>{
        await createObject.create('1', {name: 'smartphone', price: 3000, description: 'Latest smartphone available', image: ''});

        const object = await fakeObjectsRepository.findById('1');

        expect(object.image).toMatch(path.resolve(__dirname, '..','tmp', 'interrogation.png'))
    })

    it('Should not be able to create a new item with negative price', async () =>{
        const response = await createObject.create('1', {name: 'smartphone', price: -3000, description: 'Latest smartphone available', image: ''});

        expect(response.message).toMatch('Não é possível colocar um preço negativo no item')
    })
})

