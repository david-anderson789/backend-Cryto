/* eslint-disable camelcase */
import { Between, getRepository, Repository } from 'typeorm';
import {
  subMonths, startOfMonth, endOfMonth,
} from 'date-fns';
import ITradesRespository from '@modules/Trades/repositories/ITradesRepository';
import ICreateTradesDTO from '@modules/Trades/dtos/ICreateTradesDTO';
import User from '@modules/User/infra/typeorm/models/Users';
import Trades from '../models/Trades';
import RemoveTrades from '../models/RemoveTrades';

class TradesRepository implements ITradesRespository {
  private ormRepository: Repository<Trades>;

  private ormRepositoryRemoveTrade: Repository<RemoveTrades>;

  private ormRepositoryUser: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(Trades);
    this.ormRepositoryUser = getRepository(User);
    this.ormRepositoryRemoveTrade = getRepository(RemoveTrades);
  }

  public async create(tradeData:ICreateTradesDTO): Promise<Trades> {
    const trade = this.ormRepository.create(tradeData);

    await this.ormRepository.save(trade);

    return trade;
  }

  public async createRemove(tradeData:ICreateTradesDTO): Promise<RemoveTrades> {
    const trade = this.ormRepositoryRemoveTrade.create(tradeData);

    await this.ormRepositoryRemoveTrade.save(trade);

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

  public async findByTradesMonthsZero(user_id: string): Promise<Trades[]> {
    const dateTrades = await this.ormRepository.find({
      where: {
        user_id,
        date: Between(startOfMonth(new Date()).toISOString(),
          endOfMonth(new Date()).toISOString()),
      },
    });

    return dateTrades;
  }

  public async findByTradesMonthsOne(user_id: string): Promise<Trades[]> {
    const dateInterval = subMonths(new Date(), 1);

    const dateTrades = await this.ormRepository.find({
      where: {
        user_id,
        date: Between(startOfMonth(dateInterval).toISOString(),
          endOfMonth(dateInterval).toISOString()),
      },
    });

    return dateTrades;
  }

  public async findByTradesMonthsTwo(user_id: string): Promise<Trades[]> {
    const dateInterval = subMonths(new Date(), 2);

    const dateTrades = await this.ormRepository.find({
      where: {
        user_id,
        date: Between(startOfMonth(dateInterval).toISOString(),
          endOfMonth(dateInterval).toISOString()),
      },
    });

    return dateTrades;
  }

  public async findByTradesMonthsThree(user_id: string): Promise<Trades[]> {
    const dateInterval = subMonths(new Date(), 3);

    const dateTrades = await this.ormRepository.find({
      where: {
        user_id,
        date: Between(startOfMonth(dateInterval).toISOString(),
          endOfMonth(dateInterval).toISOString()),
      },
    });

    return dateTrades;
  }

  public async findByTradesMonthsFour(user_id: string): Promise<Trades[]> {
    const dateInterval = subMonths(new Date(), 4);

    const dateTrades = await this.ormRepository.find({
      where: {
        user_id,
        date: Between(startOfMonth(dateInterval).toISOString(),
          endOfMonth(dateInterval).toISOString()),
      },
    });

    return dateTrades;
  }

  public async findByTradesMonthsFive(user_id: string): Promise<Trades[]> {
    const dateInterval = subMonths(new Date(), 5);

    const dateTrades = await this.ormRepository.find({
      where: {
        user_id,
        date: Between(startOfMonth(dateInterval).toISOString(),
          endOfMonth(dateInterval).toISOString()),
      },
    });

    return dateTrades;
  }

  public async findByRemoveTrades(user_id: string): Promise<RemoveTrades[]> {
    const dateTrades = await this.ormRepositoryRemoveTrade.find({
      where: { user_id },
    });

    return dateTrades;
  }

  public async findByRemoveTradesMonthsZero(user_id: string): Promise<RemoveTrades[]> {
    const dateTrades = await this.ormRepositoryRemoveTrade.find({
      where: {
        user_id,
        date: Between(startOfMonth(new Date()).toISOString(),
          endOfMonth(new Date()).toISOString()),
      },
    });

    return dateTrades;
  }

  public async findByRemoveTradesMonthsOne(user_id: string): Promise<RemoveTrades[]> {
    const dateInterval = subMonths(new Date(), 1);

    const dateTrades = await this.ormRepositoryRemoveTrade.find({
      where: {
        user_id,
        date: Between(startOfMonth(dateInterval).toISOString(),
          endOfMonth(dateInterval).toISOString()),
      },
    });

    return dateTrades;
  }

  public async findByRemoveTradesMonthsTwo(user_id: string): Promise<RemoveTrades[]> {
    const dateInterval = subMonths(new Date(), 2);

    const dateTrades = await this.ormRepositoryRemoveTrade.find({
      where: {
        user_id,
        date: Between(startOfMonth(dateInterval).toISOString(),
          endOfMonth(dateInterval).toISOString()),
      },
    });

    return dateTrades;
  }

  public async findByRemoveTradesMonthsThree(user_id: string): Promise<RemoveTrades[]> {
    const dateInterval = subMonths(new Date(), 3);

    const dateTrades = await this.ormRepositoryRemoveTrade.find({
      where: {
        user_id,
        date: Between(startOfMonth(dateInterval).toISOString(),
          endOfMonth(dateInterval).toISOString()),
      },
    });

    return dateTrades;
  }

  public async findByRemoveTradesMonthsFour(user_id: string): Promise<RemoveTrades[]> {
    const dateInterval = subMonths(new Date(), 4);

    const dateTrades = await this.ormRepositoryRemoveTrade.find({
      where: {
        user_id,
        date: Between(startOfMonth(dateInterval).toISOString(),
          endOfMonth(dateInterval).toISOString()),
      },
    });

    return dateTrades;
  }

  public async findByRemoveTradesMonthsFive(user_id: string): Promise<RemoveTrades[]> {
    const dateInterval = subMonths(new Date(), 5);

    const dateTrades = await this.ormRepositoryRemoveTrade.find({
      where: {
        user_id,
        date: Between(startOfMonth(dateInterval).toISOString(),
          endOfMonth(dateInterval).toISOString()),
      },
    });

    return dateTrades;
  }
}
export default TradesRepository;
