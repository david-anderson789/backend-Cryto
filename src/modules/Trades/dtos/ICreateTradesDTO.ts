/* eslint-disable semi */
/* eslint-disable camelcase */
export default interface ICreateTradesDTO {
  currency:string,
  date: Date;
  value_trade: number;
  user_id: string;
  initials: string;
}
