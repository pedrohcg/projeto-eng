import mssql from 'mssql';
import SqlServerConfig from '../config/sqlserverconfig';

import User from '../model/User';
import AppError from '../errors/AppError';
import { hash } from 'bcrypt';

interface IRequest{
    name: string;
    email: string;
    password: string;
}

export default class CreateUserService{
    constructor(){}

    public async create({name, email, password}: IRequest): Promise<User|AppError>{
        const newUser = new User(name, email, password);
        try{
            await mssql.connect(SqlServerConfig);

            const userExists = await mssql.query(`SELECT 1 FROM Users WHERE email = '${newUser.email}'`);

            if(userExists.rowsAffected[0]){
                return new AppError('Email já em uso', 409);
            }

            const hashedPassword = await hash(newUser.password, 8);

            await mssql.query(`INSERT INTO Users (name, email, password) VALUES('${newUser.name}', '${newUser.email}', '${hashedPassword}')`);

            return new AppError('Usuário criado com sucesso', 200);
        }
        catch(err){
            console.log(err)
            return new AppError('Erro interno', 500);
        }
    }
}