import path from 'path';

export default class Objects{
    public owner_id: string;
    public price: Number;
    public description: string;
    public name: string;
    public image?: string;

    constructor(owner_id: string, price: Number, description: string, name: string, image?: string){
        this.owner_id = owner_id;
        this.price = price;
        this.description = description;
        this.name = name;
        if(image){
            this.image = image;
        } else{
            this.image = path.resolve(__dirname, '..','tmp', 'interrogation.png');
        }
    }
}