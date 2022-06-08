import mssql from 'mssql';
import SqlServerConfig from '../config/sqlserverconfig';
import IObjectsRepository from './IObjectsRepository';

import Object from '../model/Object';

export default class ObjectsRepository implements IObjectsRepository{
    constructor(){}

    public async findById(id: string): Promise<any> {
        const user_id = Number(id);

        await mssql.connect(SqlServerConfig);

        const findUser = await mssql.query(`SELECT C.id, U.name Owner_Name, O.name Object_Name, O.price, O.description, O.image, C.name Category_Name FROM Objects O 
                                            INNER JOIN Categorias C 
                                            ON O.category_id =  C.id
                                            INNER JOIN Users U
                                            ON O.owner_id = U.id
                                            WHERE id = ${user_id}`);

        return findUser.recordset[0];
    }

    public async findByOwner(owner_id: string): Promise<any> {
        const id = Number(owner_id);

        await mssql.connect(SqlServerConfig);

        const findUser = await mssql.query(`SELECT C.id, U.name Owner_Name, O.name Object_Name, O.price, O.description, O.image, C.name Category_Name FROM Objects O
                                            INNER JOIN Categorias C 
                                            ON O.category_id =  C.id
                                            INNER JOIN Users U
                                            ON O.owner_id = U.id
                                            WHERE O.owner_id = ${id}`);

        return findUser.recordset;
    }

    public async getCategory(category_name: string): Promise<string> {
        await mssql.connect(SqlServerConfig);

        const category = await mssql.query(`SELECT id FROM Categorias WHERE name = '${category_name}'`);

        return category.recordset[0].id;
    }

    public async update(id: string, data: Object): Promise<any> {
        await mssql.connect(SqlServerConfig);

        await mssql.query(`UPDATE Objects SET name = '${data.name}', price = '${data.price}', description = '${data.description}', image = '${data.image}' WHERE id = ${id}`)
    }

    public async create(data: Object): Promise<any> {
        const id = Number(data.owner_id);
        console.log(data.category)
        await mssql.connect(SqlServerConfig);

        await mssql.query(`INSERT INTO Objects (owner_id, name, price, description, image, category_id) 
                        VALUES('${id}', '${data.name}', '${data.price}', '${data.description}', '${data.image}', '${data.category}')`);
    }
}