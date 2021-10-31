/* eslint-disable semi */
/* eslint-disable camelcase */
export default interface ICreateWalletTradeDTO {
  currency:string,
  date: Date;
  value_currency: number;
  qtd_currency: number;
  wallet_id: string;
  image: string;
  symbol: string;
  amount_fiat: number;
}
