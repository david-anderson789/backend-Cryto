/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import { inject, injectable } from 'tsyringe';
import { getMonth, subMonths } from 'date-fns';
import ITradesRespository from '../repositories/ITradesRepository';

interface IRequest{
  user_id: string;
}

@injectable()
class ListAmoutMonthsService {
  constructor(
    @inject('TradesRepository')
    private tradesRepository: ITradesRespository,
  ) {}

  public async execute({ user_id }: IRequest):Promise<object> {
    const dateSeacherMonthsZero = await this.tradesRepository.findByTradesMonthsZero(user_id);
    const dateSeacherMonthsOne = await this.tradesRepository.findByTradesMonthsOne(user_id);
    const dateSeacherMonthsTwo = await this.tradesRepository.findByTradesMonthsTwo(user_id);
    const dateSeacherMonthsThree = await this.tradesRepository.findByTradesMonthsThree(user_id);
    const dateSeacherMonthsFour = await this.tradesRepository.findByTradesMonthsFour(user_id);
    const dateSeacherMonthsFive = await this.tradesRepository.findByTradesMonthsFive(user_id);

    const dateSeacherRemoveTradesZero = await this.tradesRepository
      .findByRemoveTradesMonthsZero(user_id);
    const dateSeacherRemoveTradesOne = await this.tradesRepository
      .findByRemoveTradesMonthsOne(user_id);
    const dateSeacherRemoveTradesTwo = await this.tradesRepository
      .findByRemoveTradesMonthsTwo(user_id);
    const dateSeacherRemoveTradesTree = await this.tradesRepository
      .findByRemoveTradesMonthsThree(user_id);
    const dateSeacherRemoveTradesFour = await this.tradesRepository
      .findByRemoveTradesMonthsFour(user_id);
    const dateSeacherRemoveTradesFive = await this.tradesRepository
      .findByRemoveTradesMonthsFive(user_id);

    const listCurrentMonth = dateSeacherMonthsZero.filter((list) => list.date).map(
      (list) => list.value_trade,
    ).reduce((currentWeek, array) => currentWeek + array, 0);

    const listCurrentMonthNegative = dateSeacherRemoveTradesZero.filter((list) => list.date).map(
      (list) => list.value_trade,
    ).reduce((currentWeek, array) => currentWeek + array, 0);

    const amountMonthZero = listCurrentMonth + listCurrentMonthNegative;

    const listfirstMonthBefore = dateSeacherMonthsOne.filter((list) => list.date).map(
      (list) => list.value_trade,
    ).reduce((currentWeek, array) => currentWeek + array, 0);

    const listfirstMonthBeforeNegative = dateSeacherRemoveTradesOne.filter((list) => list.date).map(
      (list) => list.value_trade,
    ).reduce((currentWeek, array) => currentWeek + array, 0);

    const amountMonthOne = listfirstMonthBefore + listfirstMonthBeforeNegative;

    const listsecondMonthBefore = dateSeacherMonthsTwo.filter((list) => list.date).map(
      (list) => list.value_trade,
    ).reduce((currentWeek, array) => currentWeek + array, 0);

    const listsecondMonthBeforeNegative = dateSeacherRemoveTradesTwo.filter(
      (list) => list.date,
    ).map((list) => list.value_trade).reduce((currentWeek, array) => currentWeek + array, 0);

    const amountMonthTwo = listsecondMonthBefore + listsecondMonthBeforeNegative;

    const listthirdMonthBefore = dateSeacherMonthsThree.filter((list) => list.date).map(
      (list) => list.value_trade,
    ).reduce((currentWeek, array) => currentWeek + array, 0);

    const listthirdMonthBeforeNegative = dateSeacherRemoveTradesTree.filter(
      (list) => list.date,
    ).map((list) => list.value_trade).reduce((currentWeek, array) => currentWeek + array, 0);

    const amountMonthThree = listthirdMonthBefore + listthirdMonthBeforeNegative;

    const listfourthMonthBefore = dateSeacherMonthsFour.filter((list) => list.date).map(
      (list) => list.value_trade,
    ).reduce((currentWeek, array) => currentWeek + array, 0);

    const listfourthMonthBeforeNegative = dateSeacherRemoveTradesFour.filter(
      (list) => list.date,
    ).map((list) => list.value_trade).reduce((currentWeek, array) => currentWeek + array, 0);

    const amountMonthFour = listfourthMonthBefore + listfourthMonthBeforeNegative;

    const listfifthMonthBefore = dateSeacherMonthsFive.filter((list) => list.date).map(
      (list) => list.value_trade,
    ).reduce((currentWeek, array) => currentWeek + array, 0);

    const listfifthMonthBeforeNegative = dateSeacherRemoveTradesFive.filter(
      (list) => list.date,
    ).map((list) => list.value_trade).reduce((currentWeek, array) => currentWeek + array, 0);

    const amountMonthFive = listfifthMonthBefore + listfifthMonthBeforeNegative;

    const dateIntervalzero = subMonths(new Date(), 0);
    const zero = getMonth(dateIntervalzero);

    const dateIntervalone = subMonths(new Date(), 1);
    const one = getMonth(dateIntervalone);

    const dateIntervaltwo = subMonths(new Date(), 2);
    const two = getMonth(dateIntervaltwo);

    const dateIntervaltree = subMonths(new Date(), 3);
    const tree = getMonth(dateIntervaltree);

    const dateIntervalfour = subMonths(new Date(), 4);
    const four = getMonth(dateIntervalfour);

    const dateIntervalfive = subMonths(new Date(), 5);
    const five = getMonth(dateIntervalfive);

    const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Aug', 'Set', 'Out', 'Nov', 'Dez',
    ];
    return [
      {
        Amount: amountMonthZero,
        Month: monthNames[zero],
      },
      {
        Amount: amountMonthOne,
        Month: monthNames[one],
      },
      {
        Amount: amountMonthTwo,
        Month: monthNames[two],
      },
      {
        Amount: amountMonthThree,
        Month: monthNames[tree],
      },
      {
        Amount: amountMonthFour,
        Month: monthNames[four],
      },
      {
        Amount: amountMonthFive,
        Month: monthNames[five],
      },
    ];
  }
}

export default ListAmoutMonthsService;
