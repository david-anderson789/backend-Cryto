import { container } from 'tsyringe';

import '@modules/User/provider';

import IUsersRepository from '@modules/User/repositories/IUsersRepository';
import UsersRepository from '@modules/User/infra/typeorm/repositories/UsersRepository';

import ITradesRepository from '@modules/Trades/repositories/ITradesRepository';
import TradesRepository from '@modules/Trades/infra/typeorm/repositories/TradesRepository';

import ICoinGeckoClient from '@modules/Trades/coins/CoinGeckoClient/models/ICoinGeckoClient';
import CoinGeckoClients from '@modules/Trades/coins/CoinGeckoClient/implementations/CoinGeckoClient';

import IListResultsTradeRepository from '@modules/Trades/repositories/IListResultsTradeRepository';
import ListResultsTradeRepository from '@modules/Trades/infra/typeorm/repositories/ListResultsTradeRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository', UsersRepository,
);

container.registerSingleton<ITradesRepository>(
  'TradesRepository', TradesRepository,
);

container.registerSingleton<ICoinGeckoClient>(
  'CoinGeckoClients', CoinGeckoClients,
);

container.registerSingleton<IListResultsTradeRepository>(
  'ListResultsTradeRepository', ListResultsTradeRepository,
);
