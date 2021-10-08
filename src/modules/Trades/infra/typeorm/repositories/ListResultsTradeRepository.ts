/* eslint-disable camelcase */
import { getRepository, Repository } from 'typeorm';
import { } from 'date-fns';
import IListResultsTradeRepository from '@modules/Trades/repositories/IListResultsTradeRepository';

import IListResultsTradesDTO from '@modules/Trades/dtos/IListResultsTradesDTO';

import ListStatistics from '../models/ListStatistics';

class ListResultsTradeRepository implements IListResultsTradeRepository {
  private ormRepositoryStatistics: Repository<ListStatistics>;

  constructor() {
    this.ormRepositoryStatistics = getRepository(ListStatistics);
  }

  public async createStatistics(dataStatistics: IListResultsTradesDTO): Promise<ListStatistics> {
    const statistics = this.ormRepositoryStatistics.create(dataStatistics);

    await this.ormRepositoryStatistics.save(statistics);

    return statistics;
  }

  public async findByUserIdStatistics(user_id: string): Promise<ListStatistics | undefined> {
    const userId = await this.ormRepositoryStatistics.findOne({ where: { user_id } });

    return userId;
  }

  public async deleteStatistics(statistics: ListStatistics): Promise<ListStatistics> {
    return this.ormRepositoryStatistics.remove(statistics);
  }

  public async saveStatistics(statistics: ListStatistics): Promise<ListStatistics> {
    return this.ormRepositoryStatistics.save(statistics);
  }
}
export default ListResultsTradeRepository;
