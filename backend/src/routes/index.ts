import pkg from 'express';

import registerRouter from './user.routes';

const {Router} = pkg;
const routes = Router();

routes.use('/teste', registerRouter)

export default routes;