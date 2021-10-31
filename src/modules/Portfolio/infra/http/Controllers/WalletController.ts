/* eslint-disable camelcase */
import ListWalletService from '@modules/Portfolio/services/ListWalletService';
import RemoveWalletService from '@modules/Portfolio/services/RemoveWalletService';
import UpdateWalletService from '@modules/Portfolio/services/UpdateWalletService';
import WalletServices from '@modules/Portfolio/services/WalletServices';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class WalletController {
  public async create(request:Request, response:Response):Promise<Response> {
    const user_id = request.user.id;
    const { name } = request.body;

    const walletResults = container.resolve(WalletServices);

    const wallet = await walletResults.execute({
      user_id,
      name,
    });

    return response.json(wallet);
  }

  public async delete(request:Request, response:Response):Promise<Response> {
    const { id } = request.params;

    const walletResults = container.resolve(RemoveWalletService);

    await walletResults.execute(id);

    return response.json({ message: 'wallet excluded' });
  }

  public async update(request:Request, response:Response):Promise<Response> {
    const { id } = request.params;
    const { name } = request.body;

    const walletResults = container.resolve(UpdateWalletService);

    const updateWallet = await walletResults.execute({
      id,
      name,
    });

    return response.json(updateWallet);
  }

  public async index(request:Request, response:Response):Promise<Response> {
    const user_id = request.user.id;
    const walletResults = container.resolve(ListWalletService);

    const results = await walletResults.execute(user_id);

    return response.json(results);
  }
}
