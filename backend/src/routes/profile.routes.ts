import {Request, Response, Router} from 'express';
import bodyParser from 'body-parser';
import UsersRepository from '../repositories/UserRepository';
import ensureAuthenticated from '../middlewares/authenticate';

import UpdateProfileService from '../services/UpdateProfileService';

const jsonParser = bodyParser.json();
const profileRouter = Router();

profileRouter.put('/', jsonParser, ensureAuthenticated, async (req: Request, res: Response): Promise<any> => {
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