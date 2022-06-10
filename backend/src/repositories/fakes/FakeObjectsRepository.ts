import IObjectsRepository from '../IObjectsRepository';
import Object from '../../model/Object';

interface fakeObject extends Object{
    id: string;
}

export default class FakeObjectsRepository implements IObjectsRepository{
    private items: fakeObject[] = [];
    private object_id = 1;

    constructor(){}

    public async findById(id: string): Promise<any> {
        const findIndex = this.items.findIndex(findItem => findItem.id === id);

        const findItem = this.items[findIndex];

        return findItem;
    }

    public async findByOwner(owner_id: string): Promise<any> {
        const userItems: fakeObject[] = [];

        this.items.forEach(function(item){
            if(item.owner_id === owner_id){
                userItems.push(item);
            }
        });

        return userItems;
    }

    public async getCategory(category_id: string): Promise<string> {
        return "Eletronico"
    }

    public async create(data: Object): Promise<any> {
        const id_String = this.object_id.toString();

        const newObject: fakeObject = {id: id_String, owner_id: data.owner_id, name: data.name, price: data.price, description: data.description, category: data.category, image: data.image};

        this.object_id += 1;

        this.items.push(newObject);
      
        return newObject;
    }

    public async update(id: string, data: Object): Promise<any> {
        const findIndex = this.items.findIndex(findItem => findItem.id === id);
      
        this.items[findIndex] = {id: this.items[findIndex].id, owner_id: data.owner_id, name: data.name, price: data.price, description: data.description, category: data.category, image: data.image};

        return this.items[findIndex];
    }
}