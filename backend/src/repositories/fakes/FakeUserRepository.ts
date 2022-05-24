import User from '../../model/User';
import IUsersRepository from '../IUserRepository';

interface fakeUser extends User{
    id: string;
    avatar: string;
}

class FakeUsersRepository implements IUsersRepository{
    private users: fakeUser[] = [];
    private user_id = 1;

    constructor(){}

    public async findById(id: string): Promise<any>{
        const findIndex = this.users.findIndex(findUser => findUser.id === id);

        const findUser = this.users[findIndex];

        return findUser;
    }

    public async findByEmail(email: string): Promise<any> {
        const findUser = this.users.find(user => user.email === email);

        return findUser;
    }   

    public async create(user: User): Promise<User>{  
        const id_String = this.user_id.toString();

        const newUser: fakeUser = {id: id_String, name: user.name, email: user.email, password: user.password, avatar: user.avatar};

        this.user_id += 1;

        this.users.push(newUser);
      
        return newUser;
    }

    public async save(user: User){
        const findIndex = this.users.findIndex(findUser => findUser.email === user.email);

        this.users[findIndex] = {id: this.users[findIndex].id,name: user.name,email: user.email,password: user.password};

        return this.users[findIndex];
    }

    public async update(id: string, user: User){
        const findIndex = this.users.findIndex(findUser => findUser.id === id);

        this.users[findIndex] = {id: this.users[findIndex].id,name: user.name,email: user.email,password: user.password};

        return this.users[findIndex];
    }
}

export default FakeUsersRepository;