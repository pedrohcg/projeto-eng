import IObjectsRepository from '../repositories/IObjectsRepository';
import AppError from '../errors/AppError'

export default class ShowObjectListService{
    private objectsRepository: IObjectsRepository;

    constructor(objectsRepository: IObjectsRepository){
        this.objectsRepository = objectsRepository;
    }

    public async execute(user_id: string, id: string){
        const object = await this.objectsRepository.findById(id)
        
        if(object.owner_id != user_id){
            throw new AppError('Usuário não pode excluir esse anúncio', 404);
        }
        
        await this.objectsRepository.delete(id);

        return {message: "Item deletado"};
    }
}