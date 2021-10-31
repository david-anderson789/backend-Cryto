/* eslint-disable camelcase */
import { inject, injectable } from 'tsyringe';

import ITradesRespository from '../repositories/ITradesRepository';
import Trades from '../infra/typeorm/models/Trades';

interface IRequest {
  user_id: string;
}

@injectable()
class ListCreateTradeService {
  constructor(
    @inject('TradesRepository')
    private tradesRepository: ITradesRespository,
  ) {}

  public async execute({ user_id }:IRequest): Promise<Trades[]> {
    const datetrade = await this.tradesRepository.findByTrades(user_id);
    return datetrade;
  }
}
export default ListCreateTradeService;
