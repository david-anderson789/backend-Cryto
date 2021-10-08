/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListResultsTrade from '@modules/Trades/services/ListResultsTrade';

export default class ListStatisticsControllers {
  public async create(request:Request, response:Response): Promise<Response> {
    const listResultsTrades = container.resolve(ListResultsTrade);
    const user_id = request.user.id;

    const listTrade = await listResultsTrades.execute({
      user_id,
    });

    return response.json(listTrade);
  }
}
