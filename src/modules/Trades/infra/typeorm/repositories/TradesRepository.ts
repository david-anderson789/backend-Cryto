/* eslint-disable camelcase */
import { getRepository, Repository } from 'typeorm';
import { } from 'date-fns';
import ITradesRespository from '@modules/Trades/repositories/ITradesRepository';
import ICreateTradesDTO from '@modules/Trades/dtos/ICreateTradesDTO';
import User from '@modules/User/infra/typeorm/models/Users';
import Trades from '../models/Trades';

class TradesRepository implements ITradesRespository {
  private ormRepository: Repository<Trades>;

  private ormRepositoryUser: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(Trades);
    this.ormRepositoryUser = getRepository(User);
  }

  public async create(tradeData:ICreateTradesDTO): Promise<Trades> {
    const trade = this.ormRepository.create(tradeData);

    await this.ormRepository.save(trade);

    return trade;
  }
  /*
  public async createStatistics(dataStatistics: IListResultsTradesDTO): Promise<ListStatistics> {
    const statistics = this.ormRepositoryStatistics.create(dataStatistics);

    await this.ormRepositoryStatistics.save(statistics);

    return statistics;
  } */

  public async findById(id: string): Promise<User | undefined> {
    const userId = await this.ormRepositoryUser.findOne(id);

    return userId;
  }
  /*
  public async findByUserIdStatistics(user_id: string): Promise<ListStatistics | undefined> {
    const userId = await this.ormRepositoryStatistics.findOne(user_id);

    return userId;
  } */

  /*   public async deleteStatistics(statistics: ListStatistics): Promise<ListStatistics> {
    return this.ormRepositoryStatistics.remove(statistics);
  } */

  public async findByCurrency(currency: string, user_id: string): Promise<Trades | undefined> {
    const currencys = await this.ormRepository.findOne({
      where: { currency, user_id },
    });
    return currencys;
  }

  public async save(trade: Trades): Promise<Trades> {
    return this.ormRepository.save(trade);
  }
  /*
  public async saveStatistics(statistics: ListStatistics): Promise<ListStatistics> {
    return this.ormRepository.save(statistics);
  } */

  public async findByTrades(user_id: string): Promise<Trades[]> {
    const dateTrades = await this.ormRepository.find({
      where: { user_id },
    });

    return dateTrades;
  }
}
export default TradesRepository;
