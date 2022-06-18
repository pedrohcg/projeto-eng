import {Request, Response, Router} from 'express';
import bodyParser from 'body-parser';
import UsersRepository from '../repositories/UserRepository';

import AuthenticateUserService from '../services/AuthenticateUserService';

const jsonParser = bodyParser.json();
const sessionsRouter = Router();

sessionsRouter.post('/', async (req: Request, res: Response): Promise<Response> => {
    const email = req.body.email;
    const password = req.body.password;

    const usersRepository = new UsersRepository();

    const authenticateUser = new AuthenticateUserService(usersRepository);

    const user = await authenticateUser.execute({email, password});

    return res.json(user);
})

export default sessionsRouter;