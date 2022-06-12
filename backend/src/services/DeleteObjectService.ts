import IObjectsRepository from '../repositories/IObjectsRepository';

export default class ShowObjectListService{
    private objectsRepository: IObjectsRepository;

    constructor(objectsRepository: IObjectsRepository){
        this.objectsRepository = objectsRepository;
    }

    public async execute(id: string){
        await this.objectsRepository.delete(id);

        return {message: "Item deletado"};
    }
}