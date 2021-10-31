/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import { inject, injectable } from 'tsyringe';
import {
  isThisMonth, isThisWeek, isToday, isThisYear,
} from 'date-fns';
import ListStatistics from '@modules/Trades/infra/typeorm/models/ListStatistics';

import ITradesRespository from '../repositories/ITradesRepository';
import IListResultsTradeRepository from '../repositories/IListResultsTradeRepository';

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
    const dateSeacherTrades = await this.tradesRepository.findByTrades(user_id);
    const dateSeacherRemoveTrades = await this.tradesRepository.findByRemoveTrades(user_id);

    const currentMonth = dateSeacherTrades.filter((list) => isThisMonth(list.date)).map(
      (list) => list.value_trade,
    ).reduce((currentMonth, array) => currentMonth + array, 0);

    const currentMonthnegative = dateSeacherRemoveTrades.filter(
      (list) => isThisMonth(list.date),
    ).map(
      (list) => list.value_trade,
    ).reduce((currentMonth, array) => currentMonth + array, 0);

    const amountMonth = currentMonth + currentMonthnegative;

    const currentWeek = dateSeacherTrades.filter((list) => isThisWeek(list.date)).map(
      (list) => list.value_trade,
    ).reduce((currentWeek, array) => currentWeek + array, 0);

    const currentWeeknegative = dateSeacherRemoveTrades.filter((list) => isThisWeek(list.date)).map(
      (list) => list.value_trade,
    ).reduce((currentWeek, array) => currentWeek + array, 0);

    const amountWeek = currentWeek + currentWeeknegative;

    const today = dateSeacherTrades.filter((list) => isToday(list.date)).map(
      (list) => list.value_trade,
    ).reduce((today, array) => today + array, 0);

    const todaynegative = dateSeacherRemoveTrades.filter((list) => isToday(list.date)).map(
      (list) => list.value_trade,
    ).reduce((today, array) => today + array, 0);

    const amountToday = today + todaynegative;

    const currentYear = dateSeacherTrades.filter((list) => isThisYear(list.date)).map(
      (list) => list.value_trade,
    ).reduce((currentYear, array) => currentYear + array, 0);

    const currentYearnegative = dateSeacherRemoveTrades.filter((list) => isThisYear(list.date)).map(
      (list) => list.value_trade,
    ).reduce((currentYear, array) => currentYear + array, 0);

    const amountYear = currentYear + currentYearnegative;

    const userIDStatistics = await this.listResultsTradeRepository.findByUserIdStatistics(user_id);

    if (userIDStatistics) {
      userIDStatistics.currentMonth = amountMonth;
      userIDStatistics.currentWeek = amountWeek;
      userIDStatistics.currentYear = amountYear;
      userIDStatistics.today = amountToday;

      await this.listResultsTradeRepository.saveStatistics(userIDStatistics);

      return userIDStatistics;
    }

    const infoReport = await this.listResultsTradeRepository.createStatistics({
      user_id,
      currentYear: amountYear,
      currentMonth: amountMonth,
      currentWeek: amountWeek,
      today: amountToday,
    });

    return infoReport;
  }
}

export default ListResultsTrades;
