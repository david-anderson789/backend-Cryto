import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Wallet from '../infra/typeorm/models/Wallet';
import IWalletRepository from '../repositories/IWalletRepository';

/* eslint-disable camelcase */
interface IRequest {
  name:string,
  user_id: string;
}
@injectable()
class WalletServices {
  constructor(
    @inject('WalletRepository')
    private walletRepository: IWalletRepository,
  ) {}

  public async execute({ name, user_id }:IRequest):Promise<Wallet> {
    const countWallet = await this.walletRepository.findByWallet(user_id);

    const [, countNumber] = countWallet;

    if (countNumber > 11) {
      throw new AppError('Maximum limit of 12 portfolios exceeded');
    }

    const wallet = await this.walletRepository.create({
      name,
      user_id,
    });
    return wallet;
  }
}
export default WalletServices;
