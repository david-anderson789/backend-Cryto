/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListAmoutMonthsService from '@modules/Trades/services/ListAmoutMonthsService';

export default class ListAmoutMonthsControllers {
  public async index(request:Request, response:Response):Promise<Response> {
    const user_id = request.user.id;
    const listResultsTrades = container.resolve(ListAmoutMonthsService);

    const listTrade = await listResultsTrades.execute({
      user_id,
    });

    return response.json(listTrade);
  }
}
