import pkg from 'express';

import registerRouter from './user.routes';
import sessionsRouter from './sessions.routes';
import profileRouter from './profile.routes';

const {Router} = pkg;
const routes = Router();

routes.use('/user', registerRouter)
routes.use('/login', sessionsRouter)
routes.use('/profile', profileRouter)

export default routes;