/* eslint-disable camelcase */
import { inject, injectable } from 'tsyringe';
import Trades from '@modules/Trades/infra/typeorm/models/Trades';

import ITradesRespository from '../repositories/ITradesRepository';
import ICoinGeckoClient from '../coins/CoinGeckoClient/models/ICoinGeckoClient';

interface IRequest {
  currency:string,
  date: Date;
  value_trade: number;
  user_id: string;
}

@injectable()
class RemoveTradeService {
  constructor(
    @inject('TradesRepository')
    private tradesRepository: ITradesRespository,

    @inject('CoinGeckoClients')
    private coingeckoclient: ICoinGeckoClient,
  ) {}

  public async execute({
    currency, date, value_trade, user_id,
  }:IRequest): Promise<Trades> {
    const viewCurrency = await this.coingeckoclient.coinId(currency);

    const checkCurrencyExists: Trades = await this.tradesRepository.findByCurrency(
      viewCurrency.name, user_id,
    );
    // checa se moeda já existe, se existir atualiza seu valor total no trade
    if (checkCurrencyExists) {
      const valueTotal = checkCurrencyExists.value_trade + (-value_trade);

      checkCurrencyExists.value_trade = valueTotal;

      await this.tradesRepository.save(checkCurrencyExists);

      return checkCurrencyExists;
    }
    // Se não ouver essa moeda no banco de dados adiciona-se a msm.

    const trade = await this.tradesRepository.create({
      currency: viewCurrency.name,
      date,
      value_trade: (-value_trade),
      initials: viewCurrency.symbol,
      user_id,
    });

    return trade;
  }
}
export default RemoveTradeService;
