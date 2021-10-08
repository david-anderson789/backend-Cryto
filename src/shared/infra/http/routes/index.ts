import { Router } from 'express';
import sessionsRouter from '@modules/User/infra/http/routes/sessions.routes';
import usersRouter from '@modules/User/infra/http/routes/users.routes';
import tradesRouter from '@modules/Trades/infra/http/routes/trades.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/trades', tradesRouter);

export default routes;
