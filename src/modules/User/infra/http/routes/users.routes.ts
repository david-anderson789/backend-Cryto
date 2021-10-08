import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/User/infra/middlewares/ensureAuthenticated';
import AvatarControllers from '../controllers/AvatarControllers';
import UsersControllers from '../controllers/UsersControllers';

const usersRouter = Router();
const upload = multer(uploadConfig);

const usersControllers = new UsersControllers();
const avatarControllers = new AvatarControllers();

usersRouter.post('/', usersControllers.create);
usersRouter.patch('/', ensureAuthenticated, upload.single('avatar'), avatarControllers.update);

export default usersRouter;
