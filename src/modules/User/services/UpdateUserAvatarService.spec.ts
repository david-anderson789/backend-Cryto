/* import AppError from '@shared/errors/AppError'; */
import FakeStorangeProvider from '@shared/container/provider/fakes/FakeStorangeProvider';
import AppError from '@shared/errors/AppError';
import UpdateUserAvatarService from './UpdateUserAvatarService';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';

describe('UpdateAvatar', () => {
  it('cria o avatar do usuário no sistema', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorangeProvider = new FakeStorangeProvider();
    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorangeProvider,
    );

    const user = await fakeUsersRepository.create({
      email: 'davidsmendess@gmail.com',
      name: 'David',
      password: '123456',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });
    expect(user.avatar).toBe('avatar.jpg');
  });

  it('verificar se o usuário nao existir', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorangeProvider = new FakeStorangeProvider();
    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorangeProvider,
    );

    expect(
      updateUserAvatarService.execute({
        user_id: 'nao exixte',
        avatarFilename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('deletar um avatar e substituir por um novo', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorangeProvider = new FakeStorangeProvider();

    const deleteFile = jest.spyOn(fakeStorangeProvider, 'deleteFile');

    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorangeProvider,
    );

    const user = await fakeUsersRepository.create({
      email: 'davidsmendess@gmail.com',
      name: 'David',
      password: '123456',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg',
    });
    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
});
