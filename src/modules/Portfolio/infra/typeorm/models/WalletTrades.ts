/* eslint-disable camelcase */
/* eslint-disable object-curly-newline */

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn } from 'typeorm';

import Wallet from './Wallet';

@Entity('wallets_trades')
class WalletTrades {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  wallet_id: string;

  @ManyToOne(() => Wallet)
  @JoinColumn({ name: 'wallet_id' })
  wallet: Wallet;

  @Column()
  currency: string;

  @Column()
  symbol: string;

  @Column('time with time zone')
  date:Date;

  @Column()
  value_currency: number;

  @Column()
  amount_fiat: number;

  @Column()
  image: string;

  @Column()
  qtd_currency: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default WalletTrades;
