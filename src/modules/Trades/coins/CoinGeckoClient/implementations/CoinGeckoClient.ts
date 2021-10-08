/* eslint-disable camelcase */
import { CoinFullInfo, CoinGeckoClient } from 'coingecko-api-v3';
import ICoinGeckoClient from '../models/ICoinGeckoClient';

class CoinGeckoClients implements ICoinGeckoClient {
   private view : CoinGeckoClient;

   constructor() {
     this.view = new CoinGeckoClient();
   }

   public async coinId(currency: string): Promise<CoinFullInfo> {
     const viewCurrency = await this.view.coinId({
       id: currency,
       tickers: true,
     });
     return viewCurrency;
   }
}

export default CoinGeckoClients;
