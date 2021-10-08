/* import AppError from '@shared/errors/AppError'; */
import FakeHashProvider from '@modules/User/provider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import AuthenticateUserService from './AuthenticateUserService';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import CreateUserService from './CreateUserServices';

describe('AuthenticateUser', () => {
  it('teste de autenticação', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    await createUserService.execute({
      email: 'davidsmendess@gmail.com',
      name: 'David',
      password: '123456',
    });

    const user = await authenticateUser.execute({
      email: 'davidsmendess@gmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('token');
  });

  it('teste de autenticação e verificação de usuario existente', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(
      authenticateUser.execute({
        email: 'davidsmendess@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('teste de autenticação com email ou senha destintas', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    await createUserService.execute({
      email: 'davidsmendess@gmail.com',
      name: 'David',
      password: '123456',
    });

    expect(
      authenticateUser.execute({
        email: 'davidsmendess@gmail.com',
        password: 'senhaErrada',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
