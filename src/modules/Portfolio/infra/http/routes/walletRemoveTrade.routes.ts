import { Router } from 'express';
import ensureAuthenticated from '@modules/User/infra/middlewares/ensureAuthenticated';
import WalletTradesRemoveController from '../Controllers/WalletTradesRemoveController';

const walletRemoveTradesRouter = Router();
const walletTradesController = new WalletTradesRemoveController();

walletRemoveTradesRouter.post('/', ensureAuthenticated, walletTradesController.create);

export default walletRemoveTradesRouter;
