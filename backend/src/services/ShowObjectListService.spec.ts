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
        await createObject.create('1', {name: 'smartphone', price: 3000, description: 'Latest smartphone available', image: '', category: '1'});
        await createObject.create('1', {name: 'smartphone', price: 3000, description: 'Latest smartphone available', image: '', category: '1'});
        await createObject.create('1', {name: 'smartphone', price: 3000, description: 'Latest smartphone available', image: '', category: '1'});
        
        const test = await showObjectsList.show('1');

        expect(test).toHaveLength(3);
    })

    it('Should be able to show all items from one category', async() => {
        await createObject.create('1', {name: 'smartphone', price: 3000, description: 'Latest smartphone available', image: '', category: '1'});
        await createObject.create('1', {name: 'smartphone', price: 3000, description: 'Latest smartphone available', image: '', category: '1'});
        
        const test = await showObjectsList.search({category: '1'});
        
        expect(test).toHaveLength(2);
    })

    it('Should be able to show all items that match with the search string', async() => {
        await createObject.create('1', {name: 'smartphone', price: 3000, description: 'Latest smartphone available', image: '', category: '1'});
        await createObject.create('1', {name: 'TV', price: 8000, description: 'pretty good smart tv', image: '', category: '1'})
        await createObject.create('1', {name: 'PS5', price: 3000, description: 'preistation faive', image: '', category: '1'});
        
        const test = await showObjectsList.search({searchString: 'smart'});

        expect(test).toHaveLength(2);
    })

    it('Should be able to show random items in the homepage', async() => {
        await createObject.create('1', {name: 'smartphone', price: 3000, description: 'Latest smartphone available', image: '', category: '1'});
        await createObject.create('1', {name: 'TV', price: 8000, description: 'pretty good smart tv', image: '', category: '1'})
        await createObject.create('1', {name: 'PS5', price: 3000, description: 'preistation faive', image: '', category: '1'});
        await createObject.create('1', {name: 'XBOX SERIES X', price: 3000, description: 'equisbox serie exis', image: '', category: '1'});
        await createObject.create('1', {name: 'NINTENDO SWITCH', price: 3000, description: 'switchzao da massa', image: '', category: '1'});
        
        const test = await showObjectsList.showHomePage();

        expect(test).toHaveLength(5);
    })
})