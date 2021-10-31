/* eslint-disable camelcase */
import { inject, injectable } from 'tsyringe';
import Trades from '@modules/Trades/infra/typeorm/models/Trades';
import AppError from '@shared/errors/AppError';
import ITradesRespository from '../repositories/ITradesRepository';
import ICoinGeckoClient from '../coins/CoinGeckoClient/models/ICoinGeckoClient';

interface IRequest {
  currency:string,
  date: Date;
  value_trade: number;
  user_id: string;
}

@injectable()
class CreateTradeService {
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

    if (value_trade < 0) {
      throw new AppError('Total value must be greater than 0.');
    }

    const trade = await this.tradesRepository.create({
      currency: viewCurrency.name,
      date,
      value_trade,
      initials: viewCurrency.symbol,
      user_id,
    });

    return trade;
  }
}
export default CreateTradeService;
