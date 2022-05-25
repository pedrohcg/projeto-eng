import IObjectsRepository from "../repositories/IObjectsRepository";

import Object from '../model/Object';
import AppError from '../errors/AppError';

interface IRequest{
    name: string;
    description: string;
    price: Number;
}

export default class CreateObjectService{
    private objectsRepository: IObjectsRepository

    constructor(objectsRepository: IObjectsRepository){
        this.objectsRepository = objectsRepository;
    }

    public async create(user_id: string, {name, description, price}: IRequest): Promise<AppError>{
        const newObject = new Object(user_id, price, description, name);
        try{
            await this.objectsRepository.create(newObject);

            return new AppError('Item cadastrado com sucesso', 200);
        }catch(err){
            console.log(err)
            return new AppError('Erro interno', 500);
        }
    }
}