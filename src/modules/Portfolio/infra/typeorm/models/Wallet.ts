/* eslint-disable camelcase */
/* eslint-disable object-curly-newline */

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn } from 'typeorm';

import User from '@modules/User/infra/typeorm/models/Users';

@Entity('wallets')
class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Wallet;
