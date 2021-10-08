/* eslint-disable camelcase */
/* eslint-disable object-curly-newline */

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne } from 'typeorm';

import User from '@modules/User/infra/typeorm/models/Users';

@Entity('statistics')
class ListStatistics {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  today: number;

  @Column()
  currentWeek: number;

  @Column()
  currentMonth: number;

  @Column()
  currentYear: number;

  @Column()
  user_id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ListStatistics;
