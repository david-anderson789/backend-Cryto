/* eslint-disable camelcase */
/* eslint-disable semi */
import ICreateTradesDTO from '@modules/Trades/dtos/ICreateTradesDTO';
import User from '@modules/User/infra/typeorm/models/Users';

import Trades from '../infra/typeorm/models/Trades';

export default interface ITradesRespository{
  create(data: ICreateTradesDTO):Promise<Trades | undefined>;
  findById(id:string):Promise<User | undefined>;
  findByCurrency(name: string, user_id: string): Promise<Trades | undefined>;

  save(trades: Trades): Promise<Trades>;
  findByTrades(user_id:string): Promise<Trades[]>;

}
