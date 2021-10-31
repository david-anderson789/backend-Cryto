/* eslint-disable camelcase */
import WalletTradesService from '@modules/Portfolio/services/ServicesTrade/WalletTradesService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';
import FilterCurrencyTradeService from '@modules/Portfolio/services/ServicesTrade/FilterCurrencyTradeService';

export default class WalletTradesController {
  public async create(request:Request, response:Response):Promise<Response> {
    const {
      currency,
      date,
      value_currency,
      qtd_currency,
      wallet_id,
    } = request.body;

    const walletResults = container.resolve(WalletTradesService);

    const wallet = await walletResults.execute({
      currency,
      date: parseISO(date),
      value_currency,
      qtd_currency,
      wallet_id,
    });

    return response.json(wallet);
  }

  public async index(request:Request, response:Response):Promise<Response> {
    const {
      wallet_id,
    } = request.params;

    const walletResults = container.resolve(FilterCurrencyTradeService);

    const wallet = await walletResults.execute({
      wallet_id,
    });

    return response.json(wallet);
  }
}
