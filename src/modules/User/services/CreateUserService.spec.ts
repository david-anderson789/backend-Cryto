import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/User/provider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserServices';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';

describe('CreateUsers', () => {
  it('cria um usuário no sistema', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUserService.execute({
      email: 'davidsmendess@gmail.com',
      name: 'David',
      password: '123456',

    });
    expect(user).toHaveProperty('id');
  });

  it('email duplicado no sistema', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUserService.execute({
      email: 'davidsmendess@gmail.com',
      name: 'David',
      password: '123456',

    });

    expect(
      createUserService.execute({
        email: 'davidsmendess@gmail.com',
        name: 'David',
        password: '123456',

      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
