import Object from '../model/Object';

export default interface IObjectsRepository{
    findById(id: string): Promise<any>;
    findByOwner(owner_id: string): Promise<any>;
    update(id: string, data: Object): Promise<any>;
    create(data: Object): Promise<any>;
}