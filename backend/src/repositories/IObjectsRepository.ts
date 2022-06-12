import Object from '../model/Object';

export default interface IObjectsRepository{
    findById(id: string): Promise<any>;
    findByOwner(owner_id: string): Promise<any>;
    findByCategory(category: string): Promise<any>;
    findByString(searchString: string): Promise<any>;
    findRandomObject(): Promise<any>;
    getCategory(category_id: string): Promise<string>;
    update(id: string, data: Object): Promise<any>;
    delete(id: string): Promise<any>;
    create(data: Object): Promise<any>;
}