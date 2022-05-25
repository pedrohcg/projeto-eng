import User from '../model/User';

export default interface IUsersRepository{
    findById(id: string): Promise<any>;
    findByEmail(email: string): Promise<any>;
    create(data: User): Promise<User>;
    update(id: string, data: User): Promise<any>;
}