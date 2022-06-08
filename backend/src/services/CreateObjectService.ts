import IObjectsRepository from "../repositories/IObjectsRepository";

import Object from '../model/Object';
import AppError from '../errors/AppError';

interface IRequest{
    name: string;
    description: string;
    category: string;
    image?: string;
    price: Number;
}

export default class CreateObjectService{
    private objectsRepository: IObjectsRepository

    constructor(objectsRepository: IObjectsRepository){
        this.objectsRepository = objectsRepository;
    }

    public async create(user_id: string, {name, description, image, price, category}: IRequest) {
        if(price < 0){
            return new AppError('Não é possível colocar um preço negativo no item', 404);
        }

        const category_name = await this.objectsRepository.getCategory(category);

        const newObject = new Object(user_id, price, description, name, category_name, image);
       
        await this.objectsRepository.create(newObject);

        return {message: 'Item cadastrado com sucesso'};
       
    }
}