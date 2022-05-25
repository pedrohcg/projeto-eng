import {Request, Response, Router} from 'express';
import bodyParser from 'body-parser';
import ObjectsRepository from '../repositories/ObjectsRepository';
import ensureAuthenticated from '../middlewares/authenticate';
import uploadConfig from '../config/uploadConfig';

import CreateObjectService from '../services/CreateObjectService';

const jsonParser = bodyParser.json();
const objectsRouter = Router();

objectsRouter.post('/', jsonParser, ensureAuthenticated, async(req: Request, res: Response) => {
    const id = req.user.id;
    const name = req.body.name;
    const description = req.body.description;
    const price = Number(req.body.price);


    const objectsRepository = new ObjectsRepository();

    const createObject = new CreateObjectService(objectsRepository);

    const response = await createObject.create(id, {name: name, description: description, price: price});

    return res.send(response);
})

export default objectsRouter;