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

    public async findByString(searchString: string): Promise<any> {
        const userItems: fakeObject[] = [];

        this.items.forEach(function(item){
            if(item.name.indexOf(searchString) >= 0 || item.description.indexOf(searchString) >= 0){
                userItems.push(item);
            }
        });

        return userItems;
    }

    public async findByCategory(category: string): Promise<any> {
        const userItems: fakeObject[] = [];
        const fakeCategory = await this.getCategory(category)

        this.items.forEach(function(item){
            if(item.category === fakeCategory){
                userItems.push(item);
            }
        });

        return userItems;
    }

    public async findRandomObject(): Promise<any> {
        const userItems: fakeObject[] = [];

        this.items.forEach(function(item){
          userItems.push(item); 
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

    public async delete(id: string): Promise<any> {
        const findIndex = this.items.findIndex(findItem => findItem.id === id);

        delete this.items[findIndex];
    }

    public async update(id: string, data: Object): Promise<any> {
        const findIndex = this.items.findIndex(findItem => findItem.id === id);
      
        this.items[findIndex] = {id: this.items[findIndex].id, owner_id: data.owner_id, name: data.name, price: data.price, description: data.description, category: data.category, image: data.image};

        return this.items[findIndex];
    }
}