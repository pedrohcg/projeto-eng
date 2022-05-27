export default class Message{
    public message: string;
    public sender: string;
    
    constructor(message: string, sender: string){
        this.message = message;
        this.sender = sender;
    }
}