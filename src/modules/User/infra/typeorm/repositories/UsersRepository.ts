import { getRepository, Repository } from 'typeorm';
import IUsersRepository from '@modules/User/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/User/dtos/ICreateUserDTO';
import User from '../models/Users';

class UsersRepository implements IUsersRepository {
  private ormRepository : Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const checkUserExists = await this.ormRepository.findOne({
      where: { email },
    });
    return checkUserExists;
  }

  public async findById(id: string): Promise<User | undefined> {
    const userId = await this.ormRepository.findOne(id);
    return userId;
  }

  public async create(userData:ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
