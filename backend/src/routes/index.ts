import pkg from 'express';

import registerRouter from './user.routes';
import sessionsRouter from './sessions.routes';
import profileRouter from './profile.routes';
import objectsRouter from './objects.routes';
import chatRouter from './chat.routes';

const {Router} = pkg;
const routes = Router();

routes.use('/user', registerRouter)
routes.use('/login', sessionsRouter)
routes.use('/profile', profileRouter)
routes.use('/item', objectsRouter)
routes.use('/chat', chatRouter)

export default routes;