import User from '../model/User';

export default interface IUsersRepository{
    findByEmail(email: string): Promise<any>;
    create(data: User): Promise<User>;
    save(data: User): Promise<any>;
}