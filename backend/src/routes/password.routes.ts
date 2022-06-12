import {Request, Response, Router} from 'express';
import bodyParser from 'body-parser';
import UsersRepository from '../repositories/UserRepository';

import ResetPasswordService from '../services/ResetPasswordService';

const jsonParser = bodyParser.json();
const passwordRouter = Router();

passwordRouter.post('/forgot', jsonParser, async(req: Request, res: Response) => {
    const email = req.body.email;

    const usersRepository = new UsersRepository();

    const resetPassword = new ResetPasswordService(usersRepository);

    const response = await resetPassword.execute(email);

    return res.send(response)
});

export default passwordRouter;