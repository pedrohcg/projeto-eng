import path from 'path';

export default class Objects{
    public owner_id: string;
    public price: Number;
    public description: string;
    public name: string;
    public category: string
    public image?: string;

    constructor(owner_id: string, price: Number, description: string, name: string, category: string, image?: string){
        this.owner_id = owner_id;
        this.price = price;
        this.description = description;
        this.name = name;
        this.category = category;
        if(image){
            this.image = image;
        } else{
            this.image = "https://upload.wikimedia.org/wikipedia/commons/2/20/Point_d_interrogation.jpg";
        }
    }
}