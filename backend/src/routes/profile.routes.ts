import {Request, Response, Router} from 'express';
import bodyParser from 'body-parser';
import UsersRepository from '../repositories/UserRepository';
import ensureAuthenticated from '../middlewares/authenticate';
import uploadConfig from '../config/uploadConfig';

import UpdateProfileService from '../services/UpdateProfileService';
import ShowProfileService from '../services/ShowProfileService';

const jsonParser = bodyParser.json();
const profileRouter = Router();

profileRouter.get('/', ensureAuthenticated, async(req: Request, res: Response) => {
    const usersRepository = new UsersRepository();

    const showProfileService = new ShowProfileService(usersRepository);

    const user = await showProfileService.show(req.user.id);

    user.avatar = (uploadConfig.uploadsFolder + '\\' + user.avatar)

    return res.send(user);
})

profileRouter.put('/', jsonParser, ensureAuthenticated, async (req: Request, res: Response) => {
    const user_id = req.user.id;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const old_password = req.body.oldPassword;

    const usersRepository = new UsersRepository();

    const updateProfile = new UpdateProfileService(usersRepository);

    const response = await updateProfile.execute({user_id, name, email, old_password, password});

    return res.json(response);
})

export default profileRouter