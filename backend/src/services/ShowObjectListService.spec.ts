import FakeObjectsRepository from "../repositories/fakes/FakeObjectsRepository";
import CreateObjectService from "./CreateObjectService";
import ShowObjectListService from "./ShowObjectListService";


let fakeObjectsRepository: FakeObjectsRepository
let createObject: CreateObjectService
let showObjectsList: ShowObjectListService

describe('ShowObjectsList', () => {
    beforeEach(() => {
        fakeObjectsRepository = new FakeObjectsRepository();
        createObject= new CreateObjectService(fakeObjectsRepository)
        showObjectsList = new ShowObjectListService(fakeObjectsRepository)
    });

    it('Should be able to show all items from one user', async() => {
        await createObject.create('1', {name: 'smartphone', price: 3000, description: 'Latest smartphone available', image: ''});
        await createObject.create('1', {name: 'smartphone', price: 3000, description: 'Latest smartphone available', image: ''});
        await createObject.create('1', {name: 'smartphone', price: 3000, description: 'Latest smartphone available', image: ''});
        
        const test = await showObjectsList.show('1');

        expect(test).toHaveLength(3);
    })
})