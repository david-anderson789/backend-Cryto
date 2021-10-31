/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import IWalletTradesRepository from '@modules/Portfolio/repositories/IWalletTradesRepository';
import AppError from '@shared/errors/AppError';

import { inject, injectable } from 'tsyringe';

interface IRequest {
  wallet_id: string,
}

@injectable()
class FilterCurrencyTradeService {
  constructor(
    @inject('WalletTradeRepository')
    private walletRepository: IWalletTradesRepository,

  ) {}

  public async execute({
    wallet_id,
  }: IRequest):Promise<{}> {
    const searchWallet = await this.walletRepository.findByWalletTrades(wallet_id);

    const searchWalletReamove = await this.walletRepository.findByWalletTradesRemove(wallet_id);
    const newListPosNeg = searchWallet.concat(searchWalletReamove);

    if (!searchWallet) {
      throw new AppError('Wallet not existe');
    }
    const bb = searchWallet.reduce(
      (value_currency, i) => value_currency + i.value_currency, 0,
    );
    const novoLista = newListPosNeg.reduce((soma, cur) => {
      // guarda o nome atual e verifica se existe repetido
      const { currency } = cur;
      const repetido = soma.find((elem) => elem.currency === currency);
      // se for repetido soma, caso contrário adiciona o elemento ao novo array
      if (repetido) {
        repetido.qtd_currency += cur.qtd_currency;
        if (repetido.qtd_currency === 0) {
          const zero = soma.indexOf(repetido);
          this.walletRepository.findByCurrencyListRemovePositive(cur.currency);
          this.walletRepository.findByCurrencyListRemoveNegative(cur.currency);
          soma.splice(zero, 1);
        } else {
          repetido.value_currency = bb / searchWallet.length;
          repetido.amount_fiat = repetido.qtd_currency * repetido.value_currency;
        }
      } else soma.push(cur);
      // retorna o elemento agrupado e somado
      return soma;
    }, []);
    return novoLista;
  }
}
export default FilterCurrencyTradeService;
