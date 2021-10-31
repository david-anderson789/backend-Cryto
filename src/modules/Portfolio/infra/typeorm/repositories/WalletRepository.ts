/* eslint-disable camelcase */
import ICreateWalletDTO from '@modules/Portfolio/dtos/ICreateWalletDTO';
import IWalletRepository from '@modules/Portfolio/repositories/IWalletRepository';
import { DeleteResult, getRepository, Repository } from 'typeorm';
import Wallet from '../models/Wallet';

class WalletRepository implements IWalletRepository {
  private ormRepository: Repository<Wallet>;

  constructor() {
    this.ormRepository = getRepository(Wallet);
  }

  public async create(data: ICreateWalletDTO): Promise<Wallet> {
    const wallet = this.ormRepository.create(data);

    await this.ormRepository.save(wallet);

    return wallet;
  }

  public async findByWallet(user_id: string): Promise<[Wallet[], number]> {
    const countWallet = this.ormRepository.findAndCount({
      where: { user_id },
    });

    return countWallet;
  }

  public async findAllByWallet(user_id:string):Promise<Wallet[] | undefined> {
    const wallet = this.ormRepository.find({
      where: { user_id },
    });

    return wallet;
  }

  public async deleteWallet(id: string): Promise<DeleteResult> {
    const countWallet = this.ormRepository.delete(id);

    return countWallet;
  }

  public async findByOneIdWallet(id:string): Promise<Wallet > {
    const searchWallet = this.ormRepository.findOne({
      where: { id },
    });

    return searchWallet;
  }

  public async saveWallet(wallet: Wallet): Promise<Wallet> {
    return this.ormRepository.save(wallet);
  }
}

export default WalletRepository;
