import { Router } from 'express';
import ensureAuthenticated from '@modules/User/infra/middlewares/ensureAuthenticated';
import WalletTradesController from '../Controllers/WalletTradesController';

const walletTradesRouter = Router();
const walletTradesController = new WalletTradesController();

walletTradesRouter.post('/', ensureAuthenticated, walletTradesController.create);
walletTradesRouter.get('/:wallet_id', ensureAuthenticated, walletTradesController.index);

export default walletTradesRouter;
