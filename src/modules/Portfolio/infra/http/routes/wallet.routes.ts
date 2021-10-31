import { Router } from 'express';
import ensureAuthenticated from '@modules/User/infra/middlewares/ensureAuthenticated';
import WalletController from '../Controllers/WalletController';

const walletRouter = Router();
const walletController = new WalletController();

walletRouter.post('/', ensureAuthenticated, walletController.create);
walletRouter.delete('/:id', ensureAuthenticated, walletController.delete);
walletRouter.patch('/updatewallet/:id', ensureAuthenticated, walletController.update);
walletRouter.get('/', ensureAuthenticated, walletController.index);
export default walletRouter;
