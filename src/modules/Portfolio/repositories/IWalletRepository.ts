/* eslint-disable camelcase */
/* eslint-disable semi */
import { DeleteResult } from 'typeorm';
import ICreateWalletDTO from '../dtos/ICreateWalletDTO';
import Wallet from '../infra/typeorm/models/Wallet';

export default interface IWalletRepository{
  create(data: ICreateWalletDTO): Promise<Wallet | undefined>;
  findByWallet(user_id: string): Promise<[Wallet[], number]>;
  deleteWallet(id: string): Promise<DeleteResult>;
  findByOneIdWallet(id:string): Promise<Wallet | undefined>;
  saveWallet(wallet: Wallet): Promise<Wallet>;
  findAllByWallet(user_id: string):Promise<Wallet[] | undefined>;
}
