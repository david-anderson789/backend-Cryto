/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListCreateTradeService from '@modules/Trades/services/ListCreateTradeService';

export default class CreateListTradesControllers {
  public async index(request:Request, response:Response):Promise<Response> {
    const user_id = request.user.id;
    const listResultsTrades = container.resolve(ListCreateTradeService);

    const listTrade = await listResultsTrades.execute({
      user_id,
    });

    return response.json(listTrade);
  }
}
