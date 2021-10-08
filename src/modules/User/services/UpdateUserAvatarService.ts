/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import IStorageProvider from '@shared/container/provider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/User/repositories/IUsersRepository';
import User from '../infra/typeorm/models/Users';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.');
    }

    if (user.avatar) {
      // Deletar avatar anterior

      await this.storageProvider.deleteFile(user.avatar);
    }
    const filename = await this.storageProvider.saveFile(avatarFilename);

    user.avatar = filename;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
