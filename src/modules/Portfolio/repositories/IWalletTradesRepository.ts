/* eslint-disable camelcase */
/* eslint-disable semi */
import ICreateWalletTradeDTO from '../dtos/ICreateWalletTradeDTO';
import Wallet from '../infra/typeorm/models/Wallet';
import WalletTrades from '../infra/typeorm/models/WalletTrades';
import WalletTradesRemove from '../infra/typeorm/models/WalletTradesRemove';

export default interface IWalletTradesRepository{
  create(data: ICreateWalletTradeDTO): Promise<WalletTrades>;
  saveWallet(wallet: WalletTrades): Promise<WalletTrades>;
  findByWallet(id:string):Promise<Wallet | undefined>;
  findByWalletTrades(wallet_id:string):Promise<WalletTrades[] | undefined>;
  findByCurrency(currency: string):Promise<WalletTrades | undefined>;
  createRemove(data: ICreateWalletTradeDTO): Promise<WalletTradesRemove>;
  findByWalletTradesRemove(wallet_id:string):Promise<WalletTradesRemove[] | undefined>;
  findByCurrencyListRemovePositive(currency: string,):Promise<WalletTrades[] | undefined>;
  findByCurrencyListRemoveNegative(currency: string,):Promise<WalletTradesRemove[] | undefined>;
}
