/* eslint-disable camelcase */
import WalletTrades from '@modules/Portfolio/infra/typeorm/models/WalletTrades';
import IWalletTradesRepository from '@modules/Portfolio/repositories/IWalletTradesRepository';
import ICoinGeckoClient from '@modules/Trades/coins/CoinGeckoClient/models/ICoinGeckoClient';
import AppError from '@shared/errors/AppError';

import { inject, injectable } from 'tsyringe';

interface IRequest {
  currency: string,
  date: Date,
  value_currency: number,
  qtd_currency: number,
  wallet_id: string,
}

@injectable()
class RemoveWalletTradesServices {
  constructor(
    @inject('WalletTradeRepository')
    private walletRepository: IWalletTradesRepository,

    @inject('CoinGeckoClients')
    private coingeckoclient: ICoinGeckoClient,
  ) {}

  public async execute({
    currency,
    date,
    value_currency,
    qtd_currency,
    wallet_id,
  }: IRequest):Promise<WalletTrades> {
    const viewCurrency = await this.coingeckoclient.coinId(currency);

    const checkWalletID = await this.walletRepository.findByWallet(wallet_id);

    if (!checkWalletID) {
      throw new AppError('Wallet not existe');
    }

    const amount = qtd_currency * (value_currency);

    const walletTrade = await this.walletRepository.createRemove({
      currency: viewCurrency.name,
      wallet_id,
      date,
      qtd_currency: -(qtd_currency),
      value_currency,
      image: viewCurrency.image.small,
      symbol: viewCurrency.symbol,
      amount_fiat: -amount,
    });

    return walletTrade;
  }
}
export default RemoveWalletTradesServices;
