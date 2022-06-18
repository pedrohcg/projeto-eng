import AppError from '../errors/AppError';
import IObjectsRepository from '../repositories/IObjectsRepository';

interface IRequest{
    id: string;
    name?: string;
    description?: string;
    image?: string;
    price?: Number;
}

export default class UpdateObjectService{
    private objectsRepository: IObjectsRepository;

    constructor(objectsRepository :IObjectsRepository){
        this.objectsRepository = objectsRepository;
    }

    public async execute(user_id: string, {id, name, description, price, image}: IRequest){
        const object = await this.objectsRepository.findById(id);

        if(!object){
            throw new AppError('Item não encontrado', 404);
        }
       
        if(user_id != object.owner_id){
            throw new AppError('Erro de permissão', 403);
        }

        if(name){
            object.name = name;
        }

        if(description){
            object.description = description;
        }

        if(image){
            object.image = image;
        }

        if(price){
            if(price < 0){
                throw new AppError('Preço inválido', 403);
            }
            object.price = price;
        }

        await this.objectsRepository.update(object.id, object);

        return {message: 'Informações do item atualizadas com sucesso'};
    }
}