import path from 'path';

class User{
    public name: string;
    public email: string;
    public password: string;
    public avatar: string;

    constructor(name: string, email: string, password: string){
        this.name = name;
        this.email = email;
        this.password = password;
        this.avatar = path.resolve(__dirname, '..','tmp', 'default.png');
    }
}

export default User