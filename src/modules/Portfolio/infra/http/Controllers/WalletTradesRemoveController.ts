/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';
import RemoveWalletTradesServices from '@modules/Portfolio/services/ServicesTrade/RemoveWalletTradesServices';

export default class WalletTradesRemoveController {
  public async create(request:Request, response:Response):Promise<Response> {
    const {
      currency,
      date,
      value_currency,
      qtd_currency,
      wallet_id,
    } = request.body;

    const walletResults = container.resolve(RemoveWalletTradesServices);

    const wallet = await walletResults.execute({
      currency,
      date: parseISO(date),
      value_currency,
      qtd_currency,
      wallet_id,
    });

    return response.json(wallet);
  }
}
