import IObjectsRepository from 'repositories/IObjectsRepository';

export default class ShowObjectListService{
    private objectsRepository: IObjectsRepository;

    constructor(objectsRepository: IObjectsRepository){
        this.objectsRepository = objectsRepository;
    }

    public async show(owner_id: string){
        const objects = await this.objectsRepository.findByOwner(owner_id);

        return objects;
    }
}