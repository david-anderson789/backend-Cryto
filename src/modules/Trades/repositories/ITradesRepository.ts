/* eslint-disable camelcase */
/* eslint-disable semi */
import ICreateTradesDTO from '@modules/Trades/dtos/ICreateTradesDTO';
import User from '@modules/User/infra/typeorm/models/Users';

import Trades from '../infra/typeorm/models/Trades';
import RemoveTrades from '../infra/typeorm/models/RemoveTrades';

export default interface ITradesRespository{
  create(data: ICreateTradesDTO):Promise<Trades | undefined>;
  createRemove(data: ICreateTradesDTO):Promise<RemoveTrades | undefined>;
  findById(id:string):Promise<User | undefined>;
  findByCurrency(name: string, user_id: string): Promise<Trades | undefined>;
  save(trades: Trades): Promise<Trades>;

  findByTrades(user_id:string): Promise<Trades[]>;

  findByTradesMonthsZero(user_id: string): Promise<Trades[]>;
  findByTradesMonthsOne(user_id: string): Promise<Trades[]>;
  findByTradesMonthsTwo(user_id: string): Promise<Trades[]>;
  findByTradesMonthsThree(user_id: string): Promise<Trades[]>;
  findByTradesMonthsFour(user_id: string): Promise<Trades[]>;
  findByTradesMonthsFive(user_id: string): Promise<Trades[]>;

  findByRemoveTrades(user_id:string): Promise<RemoveTrades[]>;

  findByRemoveTradesMonthsZero(user_id: string): Promise<RemoveTrades[]>;
  findByRemoveTradesMonthsOne(user_id: string): Promise<RemoveTrades[]>;
  findByRemoveTradesMonthsTwo(user_id: string): Promise<RemoveTrades[]>;
  findByRemoveTradesMonthsThree(user_id: string): Promise<RemoveTrades[]>;
  findByRemoveTradesMonthsFour(user_id: string): Promise<RemoveTrades[]>;
  findByRemoveTradesMonthsFive(user_id: string): Promise<RemoveTrades[]>;
}
