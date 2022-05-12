import User from '../../model/User';
import IUsersRepository from '../IUserRepository';


class FakeUsersRepository implements IUsersRepository{
    private users: User[] = [];

    constructor(){}

    public async findByEmail(email: string): Promise<any> {
        const findUser = this.users.find(user => user.email === email);

        return findUser;
    }   

    public async create(newUser: User): Promise<User>{
        this.users.push(newUser);
        
        return newUser;
    }

    public async save(user: User){
        const findIndex = this.users.findIndex(findUser => findUser.email === user.email);

        this.users[findIndex] = user;

        return user;
    }
}

export default FakeUsersRepository;