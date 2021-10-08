/* eslint-disable camelcase */
/* eslint-disable semi */
import IListResultsTradesDTO from '../dtos/IListResultsTradesDTO';

import ListStatistics from '../infra/typeorm/models/ListStatistics';

export default interface IListResultsTradeRepository{
  findByUserIdStatistics(user_id: string): Promise<ListStatistics | undefined>;
  deleteStatistics(statistics: ListStatistics): Promise<ListStatistics>;
  saveStatistics(statistics: ListStatistics): Promise<ListStatistics>;
  createStatistics(dataStatistics: IListResultsTradesDTO): Promise<ListStatistics | undefined>;
}
