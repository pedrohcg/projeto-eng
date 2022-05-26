import {Request, Response, Router} from 'express';
import bodyParser from 'body-parser';
import ObjectsRepository from '../repositories/ObjectsRepository';
import ensureAuthenticated from '../middlewares/authenticate';
import multer from 'multer';
import uploadConfig from '../config/uploadConfig';

import CreateObjectService from '../services/CreateObjectService';
import ShowObjectListService from '../services/ShowObjectListService';
import UpdateObjectService from '../services/UpdateObjectService';

const jsonParser = bodyParser.json();
const objectsRouter = Router();
const upload = multer(uploadConfig);

objectsRouter.post('/', jsonParser, ensureAuthenticated, upload.single('objImage'), async(req: Request, res: Response) => {
    const id = req.user.id;
    const name = req.body.name;
    const description = req.body.description;
    const price = Number(req.body.price);
    const objImg = req.file?.filename


    const objectsRepository = new ObjectsRepository();

    const createObject = new CreateObjectService(objectsRepository);

    const response = await createObject.create(id, {name: name, description: description, image: objImg, price: price});

    return res.send(response);
})

objectsRouter.patch('/update', jsonParser, ensureAuthenticated, async(req: Request, res: Response) => {
    const id = req.user.id;
    const objId = req.body.id;
    const objName = req.body.name;
    const objDescription = req.body.description;
    const objPrice = req.body.price;

    const objectsRepository  = new ObjectsRepository();

    const updateObjects = new UpdateObjectService(objectsRepository);

    const response = await updateObjects.execute(id, {id: objId, name: objName, description: objDescription, price: objPrice});

    return res.send(response);
})

objectsRouter.get('/', ensureAuthenticated, async(req: Request, res: Response) => {
    const id = req.user.id;

    const objectsRepository = new ObjectsRepository();

    const showObjects = new ShowObjectListService(objectsRepository);

    const response = await showObjects.show(id);

    return res.send(response);
})

export default objectsRouter;