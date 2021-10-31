/* eslint-disable camelcase */
import ICreateWalletTradeDTO from '@modules/Portfolio/dtos/ICreateWalletTradeDTO';
import IWalletTradesRepository from '@modules/Portfolio/repositories/IWalletTradesRepository';
import { getRepository, Repository } from 'typeorm';
import Wallet from '../models/Wallet';

import WalletTrades from '../models/WalletTrades';
import WalletTradesRemove from '../models/WalletTradesRemove';

class WalletTradeRepository implements IWalletTradesRepository {
  private ormRepository: Repository<WalletTrades>;

  private ormWalletRepository: Repository<Wallet>;

  private ormWalletRemoveRepository: Repository<WalletTradesRemove>;

  constructor() {
    this.ormRepository = getRepository(WalletTrades);
    this.ormWalletRepository = getRepository(Wallet);
    this.ormWalletRemoveRepository = getRepository(WalletTradesRemove);
  }

  public async create(data: ICreateWalletTradeDTO): Promise<WalletTrades> {
    const wallet = this.ormRepository.create(data);

    await this.ormRepository.save(wallet);

    return wallet;
  }

  public async createRemove(data: ICreateWalletTradeDTO): Promise<WalletTradesRemove> {
    const wallet = this.ormWalletRemoveRepository.create(data);

    await this.ormWalletRemoveRepository.save(wallet);

    return wallet;
  }

  public async saveWallet(wallet: WalletTrades): Promise<WalletTrades> {
    return this.ormRepository.save(wallet);
  }

  public async findByWallet(wallet_id: string): Promise<Wallet> {
    const countWallet = this.ormWalletRepository.findOne({
      where: { id: wallet_id },
    });

    return countWallet;
  }

  public async findByWalletTrades(wallet_id:string):Promise<WalletTrades[]> {
    const countWallet = this.ormRepository.find({
      where: { wallet_id },
    });

    return countWallet;
  }

  public async findByWalletTradesRemove(
    wallet_id:string,
  ):Promise<WalletTradesRemove[] | undefined> {
    const countWallet = this.ormWalletRemoveRepository.find({
      where: { wallet_id },
    });

    return countWallet;
  }

  public async findByCurrency(currency: string):Promise<WalletTrades | undefined> {
    const currencyWallet = this.ormRepository.findOne({
      where: { currency },
    });

    return currencyWallet;
  }

  public async findByCurrencyListRemovePositive(
    currency: string,
  ):Promise<WalletTrades[] | undefined> {
    const currencyWallet = await this.ormRepository.find({
      where: { currency },
    });

    return this.ormRepository.remove(currencyWallet);
  }

  public async findByCurrencyListRemoveNegative(
    currency: string,
  ):Promise<WalletTradesRemove[] | undefined> {
    const currencyWallet = await this.ormWalletRemoveRepository.find({
      where: { currency },
    });

    return this.ormWalletRemoveRepository.remove(currencyWallet);
  }
}

export default WalletTradeRepository;
