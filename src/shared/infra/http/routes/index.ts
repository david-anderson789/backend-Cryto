import { Router } from 'express';
import sessionsRouter from '@modules/User/infra/http/routes/sessions.routes';
import usersRouter from '@modules/User/infra/http/routes/users.routes';
import tradesRouter from '@modules/Trades/infra/http/routes/trades.routes';
import walletRouter from '@modules/Portfolio/infra/http/routes/wallet.routes';
import walletTradesRouter from '@modules/Portfolio/infra/http/routes/walletTrades.routes';
import walletRemoveTradesRouter from '@modules/Portfolio/infra/http/routes/walletRemoveTrade.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/trades', tradesRouter);
routes.use('/portfolio', walletRouter);
routes.use('/walletTrades', walletTradesRouter);
routes.use('/walletRemoveTrades', walletRemoveTradesRouter);

export default routes;
