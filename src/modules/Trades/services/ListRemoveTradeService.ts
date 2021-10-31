/* eslint-disable camelcase */
import { inject, injectable } from 'tsyringe';

import ITradesRespository from '../repositories/ITradesRepository';
import RemoveTrades from '../infra/typeorm/models/RemoveTrades';

interface IRequest {
  user_id: string;
}

@injectable()
class ListRemoveTradeService {
  constructor(
    @inject('TradesRepository')
    private tradesRepository: ITradesRespository,
  ) {}

  public async execute({ user_id }:IRequest): Promise<RemoveTrades[]> {
    const dateremovetrade = await this.tradesRepository.findByRemoveTrades(user_id);

    return dateremovetrade;
  }
}
export default ListRemoveTradeService;
