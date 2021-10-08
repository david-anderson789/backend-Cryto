/* eslint-disable camelcase */
/* eslint-disable semi */
import { CoinFullInfo } from 'coingecko-api-v3';

export default interface ICoinGeckoClient {
  coinId(currency: string): Promise<CoinFullInfo>;
}
