/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import { inject, injectable } from 'tsyringe';
import {
  isThisMonth, isThisWeek, isToday, isThisYear,
} from 'date-fns';
import ListStatistics from '@modules/Trades/infra/typeorm/models/ListStatistics';

import ITradesRespository from '../repositories/ITradesRepository';
import IListResultsTradeRepository from '../repositories/IListResultsTradeRepository';

/* interface IResponse {
  currentMonth: number,
  currentYear: number,
  currentWeek: number,
  today: number;
} */

interface IRequest{
  user_id: string;
}

@injectable()
class ListResultsTrades {
  constructor(
    @inject('TradesRepository')
    private tradesRepository: ITradesRespository,

    @inject('ListResultsTradeRepository')
    private listResultsTradeRepository: IListResultsTradeRepository,

  ) {}

  public async execute({ user_id }: IRequest):Promise<ListStatistics> {
    const dateSeacher = await this.tradesRepository.findByTrades(user_id);

    const currentMonth = dateSeacher.filter((list) => isThisMonth(list.date)).map(
      (list) => list.value_trade,
    ).reduce((currentMonth, array) => currentMonth + array, 0);

    const currentWeek = dateSeacher.filter((list) => isThisWeek(list.date)).map(
      (list) => list.value_trade,
    ).reduce((currentWeek, array) => currentWeek + array, 0);

    const today = dateSeacher.filter((list) => isToday(list.date)).map(
      (list) => list.value_trade,
    ).reduce((today, array) => today + array, 0);

    const currentYear = dateSeacher.filter((list) => isThisYear(list.date)).map(
      (list) => list.value_trade,
    ).reduce((currentYear, array) => currentYear + array, 0);

    const userIDStatistics = await this.listResultsTradeRepository.findByUserIdStatistics(user_id);

    if (userIDStatistics) {
      userIDStatistics.currentMonth = currentMonth;
      userIDStatistics.currentWeek = currentWeek;
      userIDStatistics.currentYear = currentYear;
      userIDStatistics.today = today;

      await this.listResultsTradeRepository.saveStatistics(userIDStatistics);

      return userIDStatistics;
    }

    const infoReport = await this.listResultsTradeRepository.createStatistics({
      user_id,
      currentYear,
      currentMonth,
      currentWeek,
      today,
    });

    return infoReport;
  }
}

export default ListResultsTrades;
