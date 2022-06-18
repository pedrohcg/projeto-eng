import {Request, Response, Router} from 'express';
import bodyParser from 'body-parser';
import ensureAuthenticated from '../middlewares/authenticate';
import FilesRepository from '../repositories/FilesRepository';
import multer from 'multer';
import uploadConfig from '../config/uploadConfig';
import path from 'path';

import CreateObjectService from '../services/CreateObjectService';
import ObjectsRepository from '../repositories/ObjectsRepository';
import ShowObjectListService from '../services/ShowObjectListService';
import UpdateObjectService from '../services/UpdateObjectService';
import DeleteObjectsService from '../services/DeleteObjectService';
import UpdateObjectImageService from '../services/UpdateObjectImageService';

const jsonParser = bodyParser.json();
const objectsRouter = Router();
const upload = multer(uploadConfig);

objectsRouter.post('/', jsonParser, ensureAuthenticated, async(req: Request, res: Response) => {
    const id = req.user.id;
    const name = req.body.name;
    const description = req.body.description;
    const price = Number(req.body.price);
    const category = req.body.category
    const image = req.body.image

    const objectsRepository = new ObjectsRepository();

    const createObject = new CreateObjectService(objectsRepository);

    const response = await createObject.create(id, {name: name, description: description, price: price, category: category, image: image});

    return res.send(response);
})


objectsRouter.patch('/image/:id', jsonParser, ensureAuthenticated, upload.single('objImage'), async(req: Request, res: Response) => {
    const objImg = req.file?.filename;
    const id = req.params.id;

    const objectsRepository = new ObjectsRepository();
    const filesRepository = new FilesRepository();

    const updateImage = new UpdateObjectImageService(objectsRepository, filesRepository);

    const response = await updateImage.execute({object_id: id, imageFilename: objImg})

    return res.send(response)
})

objectsRouter.patch('/update/:id', jsonParser, ensureAuthenticated, async(req: Request, res: Response) => {
    const id = req.user.id;
    const objId = req.params.id;
    const objName = req.body.name;
    const objDescription = req.body.description;
    const objPrice = req.body.price;
    const image = req.body.image;

    const objectsRepository  = new ObjectsRepository();

    const updateObjects = new UpdateObjectService(objectsRepository);

    const response = await updateObjects.execute(id, {id: objId, name: objName, description: objDescription, price: objPrice, image: image});

    return res.send(response);
})

objectsRouter.get('/', ensureAuthenticated, async(req: Request, res: Response) => {
    const id = req.user.id;

    const objectsRepository = new ObjectsRepository();

    const showObjects = new ShowObjectListService(objectsRepository);

    const response = await showObjects.show(id);

    return res.send(response);
})

objectsRouter.get('/cards', async(req: Request, res: Response) => {
    const objectsRepository = new ObjectsRepository();

    const showObjects = new ShowObjectListService(objectsRepository);

    const response = await showObjects.showHomePage();

    return res.send(response);
})

objectsRouter.get('/:searchQuery', async(req: Request, res: Response) => {
    const searchQuery = req.params.searchQuery;

    const objectsRepository = new ObjectsRepository();

    const showObjects = new ShowObjectListService(objectsRepository);

    let response

    if(Number(searchQuery) >= 1 && Number(searchQuery) <= 6){
        response = await showObjects.search({category: searchQuery});
    }
    else{
        response = await showObjects.search({searchString: searchQuery});
    }

    return res.send(response);
})

objectsRouter.get('/one/:id', async(req: Request, res: Response) => {
    const id = req.params.id;

    const objectsRepository = new ObjectsRepository();

    const showObjects = new ShowObjectListService(objectsRepository);

    const response = await showObjects.showOne(id)

    return res.send(response);
})

objectsRouter.delete('/:itemId', ensureAuthenticated, async(req: Request, res: Response) => {
    const id = req.params.itemId;
    const user_id = req.user.id;

    const objectsRepository = new ObjectsRepository();

    const deleteObjects = new DeleteObjectsService(objectsRepository);

    const response = await deleteObjects.execute(user_id, id)

    return res.send(response);
})

export default objectsRouter;