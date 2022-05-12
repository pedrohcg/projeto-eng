import {Request, Response, Router} from 'express';
import bodyParser from 'body-parser';
import User from '../model/User';

import CreateUserService from '../services/CreateUserService';
const jsonParser = bodyParser.json();

const usersRouter = Router();

usersRouter.post('/', jsonParser, async(req: Request, res: Response): Promise<Response> => {
    const name = req.body.Name;
    const email = req.body.Email;
    const password = req.body.Password;

    const createUser = new CreateUserService()

    const user = await createUser.create({name, email, password})

    return res.json(user);
})

export default usersRouter
