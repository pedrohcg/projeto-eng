import FakeObjectsRepository from '../repositories/fakes/FakeObjectsRepository';
import CreateObjectService from './CreateObjectService';
import UpdateObjectService from './UpdateObjectService';

let objectsRepository: FakeObjectsRepository;
let createObject: CreateObjectService;
let updateObject: UpdateObjectService;

describe('UpdateObject', () => {
    beforeEach(() => {
        objectsRepository = new FakeObjectsRepository();
        createObject = new CreateObjectService(objectsRepository);
        updateObject = new UpdateObjectService(objectsRepository);
    });

    it('Should be able to update a object', async () =>{
        await createObject.create('1', {name: 'smartphone', price: 3000, description: 'Latest smartphone available', image: ''});

        await updateObject.execute('1', {id: '1', name: 'smart-tv', description: '4k smart-tv', price: 6000});

        const object = await objectsRepository.findById('1');

        expect(object.name).toMatch('smart-tv');
        expect(object.description).toMatch('4k smart-tv');
    })

    it('Should mantain the original values if none is passed', async () =>{
        await createObject.create('1', {name: 'smartphone', price: 3000, description: 'Latest smartphone available', image: ''});
        
        const response = await updateObject.execute('1', {id: '1', name: '', description: ''});

        const object = await objectsRepository.findById('1');

        expect(object.name).toMatch('smartphone');
        expect(object.description).toMatch('Latest smartphone available');
    })

    it('Should not be able to update a object price to a negative value', async () =>{
        await createObject.create('1', {name: 'smartphone', price: 3000, description: 'Latest smartphone available', image: ''});
        
        const response = await updateObject.execute('1', {id: '1', price: -250});

        expect(response.message).toMatch('Preço inválido');
    })

    it('Should not be able to update a non-existing object', async () =>{
        const response = await updateObject.execute('1', {id: '1', name: 'smart-tv', description: '4k smart-tv', price: 6000});

        expect(response.message).toMatch('Item não encontrado');
    })

    it('Should not be able to update a object from another user', async () =>{
        await createObject.create('1', {name: 'smartphone', price: 3000, description: 'Latest smartphone available', image: ''});

        await updateObject.execute('3', {id: '1', name: 'smart-tv', description: '4k smart-tv', price: 6000});

        const object = await objectsRepository.findById('1');

        expect(object.name).toMatch('smartphone');
        expect(object.description).toMatch('Latest smartphone available');
    })
})