import IUsersRepository from '@modules/User/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/User/dtos/ICreateUserDTO';
import { uuid } from 'uuidv4';
import User from '../../infra/typeorm/models/Users';

class UsersRepository implements IUsersRepository {
  private user: User[] = [];

  public async findByEmail(email: string): Promise<User | undefined> {
    const users = this.user.find((findUser) => email === findUser.email);
    return users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const users = this.user.find((findId) => id === findId.id);
    return users;
  }

  public async create(userData:ICreateUserDTO): Promise<User> {
    const users = new User();

    Object.assign(users, {
      id: uuid(),
    }, userData);

    this.user.push(users);

    return users;
  }

  public async save(user: User): Promise<User> {
    const findIndexUsers = this.user.findIndex((userfindIndex) => userfindIndex.id === user.id);

    this.user[findIndexUsers] = user;

    return user;
  }
}

export default UsersRepository;
