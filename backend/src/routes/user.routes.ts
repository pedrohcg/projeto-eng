import {Request, Response, Router} from 'express';
import bodyParser from 'body-parser';
import UsersRepository from '../repositories/UserRepository';
import authenticate from '../middlewares/authenticate';
import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import multer from 'multer';
import uploadConfig from '../config/uploadConfig';
import FilesRepository from '../repositories/FilesRepository';

const jsonParser = bodyParser.json();
const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', jsonParser, async(req: Request, res: Response): Promise<Response> => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const userRepository = new UsersRepository();

    const createUser = new CreateUserService(userRepository)

    const user = await createUser.create({name, email, password})

    return res.json(user);
});

usersRouter.patch('/avatar', authenticate, upload.single('avatar'), async (req: Request, res: Response): Promise<Response> => {
    const filename = req.file?.filename;
    const id = req.user.id

    const usersRepository = new UsersRepository();
    const filesRepository = new FilesRepository();

    const updateUserAvatarService = new UpdateUserAvatarService(usersRepository, filesRepository);
    
    const response = await updateUserAvatarService.execute({user_id: id, avatarFilename: filename});

    return res.json(response);
})

export default usersRouter
