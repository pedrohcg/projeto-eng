import {Request, Response, Router} from 'express';
import bodyParser from 'body-parser';
import UsersRepository from '../repositories/UserRepository';

import CreateUserService from '../services/CreateUserService';

const jsonParser = bodyParser.json();
const usersRouter = Router();

usersRouter.post('/register', jsonParser, async(req: Request, res: Response): Promise<Response> => {
    const name = req.body.Name;
    const email = req.body.Email;
    const password = req.body.Password;

    const userRepository = new UsersRepository();

    const createUser = new CreateUserService(userRepository)

    const user = await createUser.create({name, email, password})

    return res.json(user);
});

export default usersRouter
