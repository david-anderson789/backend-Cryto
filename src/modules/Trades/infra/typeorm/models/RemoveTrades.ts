/* eslint-disable camelcase */
/* eslint-disable object-curly-newline */

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn } from 'typeorm';

import User from '@modules/User/infra/typeorm/models/Users';

@Entity('remove_trades')
class RemoveTrades {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  currency:string;

  @Column()
  initials:string;

  @Column()
  user_id: string;

  @Column()
  value_trade: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('time with time zone')
  date:Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default RemoveTrades;
