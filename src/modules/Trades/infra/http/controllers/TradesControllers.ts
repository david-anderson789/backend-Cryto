/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import CreateTradeService from '@modules/Trades/services/CreateTradeService';
import RemoveTradeService from '@modules/Trades/services/RemoveTradeService';

export default class TradesControllers {
  public async create(request:Request, response:Response): Promise<Response> {
    const { currency, date, value_trade } = request.body;

    const createTrade = container.resolve(CreateTradeService);

    const time = parseISO(date);
    console.log(time);

    const addTrades = await createTrade.execute({
      currency,
      date: parseISO(date),
      value_trade,
      user_id: request.user.id,
    });

    return response.json(
      addTrades,
    );
  }

  public async delete(request:Request, response:Response):Promise<Response> {
    const { currency, date, value_trade } = request.body;

    const parsedDate = parseISO(date);
    const createTrade = container.resolve(RemoveTradeService);

    const addTrades = await createTrade.execute({
      currency,
      date: parsedDate,
      value_trade,
      user_id: request.user.id,
    });

    return response.json(
      addTrades,
    );
  }

  /*  public async index(request:Request, response:Response):Promise<Response> {
    const listResultsTrades = container.resolve(ListResultsTrades);
    const user_id = request.user.id;

    const listTrade = await listResultsTrades.execute({
      user_id,
    });

    return response.json(listTrade);
  } */
}
