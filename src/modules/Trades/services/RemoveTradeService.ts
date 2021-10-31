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

    const trade = await this.tradesRepository.createRemove({
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
