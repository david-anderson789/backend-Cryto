import { Router } from 'express';
import ensureAuthenticated from '@modules/User/infra/middlewares/ensureAuthenticated';
import ListCreateTradeControllers from '../controllers/ListCreateTradeControllers';
import TradesControllers from '../controllers/TradesControllers';
import ListStatisticsControllers from '../controllers/ListStatisticsControllers';
import RemoveTradesControllers from '../controllers/RemoveTradesContrallers';
import ListAmoutMonthsControllers from '../controllers/ListAmoutMonthsControllers';

const tradesRouter = Router();

const tradesControllers = new TradesControllers();
const listStatisticsControllers = new ListStatisticsControllers();
const removeTradesControllers = new RemoveTradesControllers();
const listCreateTradeControllers = new ListCreateTradeControllers();
const listAmoutMonthsControllers = new ListAmoutMonthsControllers();
/* tradesRouter.get('/', async (req, res) => {
  const usersRepository = getRepository(Trades);

  const user = await usersRepository.find({ select: ['user_id'] });

  return res.json(user);
}); */

tradesRouter.post('/', ensureAuthenticated, tradesControllers.create);
tradesRouter.post('/removetrade', ensureAuthenticated, tradesControllers.delete);
tradesRouter.post('/liststatistics', ensureAuthenticated, listStatisticsControllers.create);
tradesRouter.get('/', ensureAuthenticated, removeTradesControllers.index);
tradesRouter.get('/listTrades', ensureAuthenticated, listCreateTradeControllers.index);
tradesRouter.get('/listAmoutMonths', ensureAuthenticated, listAmoutMonthsControllers.index);
/*  const view = await testnet.coinId({
    id: currency,
    localization: false,
    community_data: false,
    developer_data: false,
    sparkline: false,
    market_data: false,
    tickers: true,
  }); */

/* const value = view.tickers.map((price) => price.last);
  const target = view.tickers.map((price) => price.target);

  const currencyFilter = view.tickers.findIndex((price) => (price.market.name === 'Binance'
  && price.target === 'USDT' ? price.last : null));

  const somatorio = () => (qtdCurrency * value[currencyFilter]); */

/*   return response.json({
    currency: view.name,
    symbol: view.symbol,
    value: value[currencyFilter],
    target: target[currencyFilter],
    image: view.image.large,
    qtdCurrency,
    amount: somatorio(),
  }); */

export default tradesRouter;
