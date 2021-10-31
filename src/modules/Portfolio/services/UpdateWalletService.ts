import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Wallet from '../infra/typeorm/models/Wallet';

import IWalletRepository from '../repositories/IWalletRepository';

interface IRequest {
  name:string,
  id: string;
}

@injectable()
class UpdateWalletService {
  constructor(
    @inject('WalletRepository')
    private walletRepository: IWalletRepository,
  ) {}

  public async execute({ id, name }: IRequest):Promise<Wallet> {
    const searchWallet = await this.walletRepository.findByOneIdWallet(id);

    if (!searchWallet) {
      throw new AppError('wallet not found');
    }

    searchWallet.name = name;

    await this.walletRepository.saveWallet(searchWallet);

    return searchWallet;
  }
}
export default UpdateWalletService;
