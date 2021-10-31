/* eslint-disable camelcase */
import { inject, injectable } from 'tsyringe';
import Wallet from '../infra/typeorm/models/Wallet';

import IWalletRepository from '../repositories/IWalletRepository';

@injectable()
class ListWalletService {
  constructor(
    @inject('WalletRepository')
    private walletRepository: IWalletRepository,
  ) {}

  public async execute(user_id: string):Promise<Wallet[]> {
    const wallet = await this.walletRepository.findAllByWallet(user_id);

    return wallet;
  }
}
export default ListWalletService;
