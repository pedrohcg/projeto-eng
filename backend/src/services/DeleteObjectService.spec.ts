import FakeObjectsRepository from "../repositories/fakes/FakeObjectsRepository";
import ShowObjectListService from "./ShowObjectListService";
import CreateObjectService from "./CreateObjectService";
import DeleteObjectService from "./DeleteObjectService";

let fakeObjectsRepository: FakeObjectsRepository
let createObject: CreateObjectService
let deleteObjects: DeleteObjectService
let showObjectList: ShowObjectListService

describe('ShowObjectsList', () => {
    beforeEach(() => {
        fakeObjectsRepository = new FakeObjectsRepository();
        createObject= new CreateObjectService(fakeObjectsRepository)
        deleteObjects = new DeleteObjectService(fakeObjectsRepository)
        showObjectList = new ShowObjectListService(fakeObjectsRepository)
    });

    it('Should be able to show all items from one user', async() => {
        await createObject.create('1', {name: 'smartphone', price: 3000, description: 'Latest smartphone available', image: '', category: '1'});
        
        await deleteObjects.execute('1')

        expect(await showObjectList.show('1')).toHaveLength(0);
    })
})