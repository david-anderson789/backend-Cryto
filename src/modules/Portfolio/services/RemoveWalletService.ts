import { inject, injectable } from 'tsyringe';
import { DeleteResult } from 'typeorm';

import IWalletRepository from '../repositories/IWalletRepository';

@injectable()
class RemoveWalletService {
  constructor(
    @inject('WalletRepository')
    private walletRepository: IWalletRepository,
  ) {}

  public async execute(id :string):Promise<DeleteResult> {
    return this.walletRepository.deleteWallet(id);
  }
}
export default RemoveWalletService;
