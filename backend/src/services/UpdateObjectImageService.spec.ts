import FakeObjectsRepository from "../repositories/fakes/FakeObjectsRepository";
import FakeFilesRepository from "../repositories/fakes/FakeFilesRepository";
import CreateObjectService from './CreateObjectService';
import UpdateObjectImageService from "./UpdateObjectImageService";

let fakeObjectsRepository: FakeObjectsRepository
let fakeFilesRepository: FakeFilesRepository
let updateObjectImage: UpdateObjectImageService
let createObject: CreateObjectService

describe('UpdateUserAvatar', () => {
    beforeEach(() => {
        fakeObjectsRepository = new FakeObjectsRepository();
        fakeFilesRepository = new FakeFilesRepository()
        createObject = new CreateObjectService(fakeObjectsRepository);
        updateObjectImage = new UpdateObjectImageService(fakeObjectsRepository, fakeFilesRepository);
    });

    it('Should be able to update a object image', async() => {
        await createObject.create('1', {name: 'smartphone', price: 3000, description: 'Latest smartphone available', image: '', category: '1'});

        await updateObjectImage.execute({object_id: '1', imageFilename: 'avatar.png'});
        
        const object = await fakeObjectsRepository.findById('1')

        expect(object.image).toBe('avatar.png');
    })

    it('Should delete the old image when uploading a new one', async() => {
        const deleteFile = jest.spyOn(fakeFilesRepository, 'delete');

        await createObject.create('1', {name: 'smartphone', price: 3000, description: 'Latest smartphone available', image: '', category: '1'});

        await updateObjectImage.execute({object_id: '1', imageFilename: 'avatar.png'});
     
        const response =  await updateObjectImage.execute({object_id: '1', imageFilename: 'avatar2.png'});
       
        expect(deleteFile).toBeCalledWith('avatar.png')
        expect(response.message).toMatch('Imagem alterado com sucesso');
    })

    it('Should not be able to update a non-existing object image', async() => {
        const response = await updateObjectImage.execute({object_id: '1', imageFilename: 'avatar.png'});

        expect(response.message).toMatch('Objecto não encontrado');
    })

    it('Should not be able to update a avatar without providing a file', async() => {
        const response = await updateObjectImage.execute({object_id: '1', imageFilename: ''});

        expect(response.message).toMatch('Arquivo não encontrado');
    })
})