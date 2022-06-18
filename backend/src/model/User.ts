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
        this.avatar = "https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png";
    }
}

export default User