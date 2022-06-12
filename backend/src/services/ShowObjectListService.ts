import IObjectsRepository from '../repositories/IObjectsRepository';
import Object from '../model/Object';

interface IUserSerach{
    category?: string;
    searchString?: string;
}

export default class ShowObjectListService{
    private objectsRepository: IObjectsRepository;

    constructor(objectsRepository: IObjectsRepository){
        this.objectsRepository = objectsRepository;
    }

    public async show(owner_id: string){
        const objects = await this.objectsRepository.findByOwner(owner_id);

        return objects;
    }

    public async search(userSearch: IUserSerach){
        if(userSearch.category){
            const objects = await this.objectsRepository.findByCategory(userSearch.category);

            return objects;
        }

        else if(userSearch.searchString){
            const objects = await this.objectsRepository.findByString(userSearch.searchString);

            return objects;
        }
    }

    public async showHomePage(){
        const objects = await this.objectsRepository.findRandomObject();

        return objects;
    }
}