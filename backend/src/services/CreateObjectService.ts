import IObjectsRepository from "../repositories/IObjectsRepository";

import Object from '../model/Object';
import AppError from '../errors/AppError';

interface IRequest{
    name: string;
    description: string;
    image?: string;
    price: Number;
}

export default class CreateObjectService{
    private objectsRepository: IObjectsRepository

    constructor(objectsRepository: IObjectsRepository){
        this.objectsRepository = objectsRepository;
    }

    public async create(user_id: string, {name, description, image, price}: IRequest): Promise<AppError>{
        if(price < 0){
            return new AppError('Não é possível colocar um preço negativo no item', 404);
        }
        
        const newObject = new Object(user_id, price, description, name, image);
       
        await this.objectsRepository.create(newObject);

        return new AppError('Item cadastrado com sucesso', 200);
       
    }
}