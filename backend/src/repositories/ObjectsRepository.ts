import mssql from 'mssql';
import SqlServerConfig from '../config/sqlserverconfig';
import IObjectsRepository from './IObjectsRepository';

import Object from '../model/Object';

export default class ObjectsRepository implements IObjectsRepository{
    constructor(){}

    public async findById(id: string): Promise<any> {
        const user_id = Number(id);

        await mssql.connect(SqlServerConfig);

        const findUser = await mssql.query(`SELECT * FROM Objects WHERE id = ${user_id}`);

        return findUser.recordset[0];
    }

    public async findByOwner(owner_id: string): Promise<any> {
        const id = Number(owner_id);

        await mssql.connect(SqlServerConfig);

        const findUser = await mssql.query(`SELECT * FROM Objects WHERE owner_id = ${id}`);

        return findUser.recordset;
    }

    public async update(id: string, data: Object): Promise<any> {
        await mssql.connect(SqlServerConfig);

        await mssql.query(`UPDATE Objects SET name = '${data.name}', price = '${data.price}', description = '${data.description}', image = '${data.image}' WHERE id = ${id}`)
    }

    public async create(data: Object): Promise<any> {
        const id = Number(data.owner_id);
        
        await mssql.connect(SqlServerConfig);

        await mssql.query(`INSERT INTO Objects (owner_id, name, price, description, image) 
                        VALUES('${id}', '${data.name}', '${data.price}', '${data.description}', '${data.image}')`);
    }
}