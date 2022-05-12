import mssql from 'mssql';
import SqlServerConfig from '../config/sqlserverconfig';
import IUsersRepository from './IUserRepository';

import User from '../model/User';

class UsersRepository implements IUsersRepository{
  constructor(){}

  public async findByEmail(email: string): Promise<any> {
    await mssql.connect(SqlServerConfig);

    const findUser = await mssql.query(`SELECT 1 FROM Users WHERE email = '${email}'`);
    
    return findUser;
  }   


  public async create(newUser: User): Promise<User>{
    await mssql.connect(SqlServerConfig);

    await mssql.query(`INSERT INTO Users (name, email, password) VALUES('${newUser.name}', '${newUser.email}', '${newUser.password}')`);
    
    return newUser;
  }

  public async save(user: User){
    await mssql.connect(SqlServerConfig);

    await mssql.query(`INSERT INTO Users (name, email, password) VALUES('${user.name}', '${user.email}', '${user.password}')`);
  }
}

export default UsersRepository;