/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListRemoveTradeService from '@modules/Trades/services/ListRemoveTradeService';

export default class RemoveTradesControllers {
  public async index(request:Request, response:Response):Promise<Response> {
    const user_id = request.user.id;
    const listResultsTrades = container.resolve(ListRemoveTradeService);

    const listTrade = await listResultsTrades.execute({
      user_id,
    });

    return response.json(listTrade);
  }
}
