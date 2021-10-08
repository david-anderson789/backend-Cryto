import { uuid } from 'uuidv4';
import ITradesRespository from '@modules/Trades/repositories/ITradesRepository';
import ICreateTradesDTO from '@modules/Trades/dtos/ICreateTradesDTO';
import Trades from '@modules/Trades/infra/typeorm/models/Trades';

class TradesRepository implements ITradesRespository {
  private trades: Trades[] = [];

  public async create(tradeData:ICreateTradesDTO): Promise<Trades> {
    const istrades = new Trades();

    Object.assign(
      istrades,
      {
        id: uuid(),
      },
      tradeData,
    );

    this.trades.push(istrades);
    return istrades;
  }
}

export default TradesRepository;
