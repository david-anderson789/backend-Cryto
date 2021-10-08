/* eslint-disable camelcase */
/* eslint-disable object-curly-newline */

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  UpdateDateColumn } from 'typeorm';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name:string;

  @Column()
  email:string;

  @Column()
  password:string;

  @Column()
  avatar:string;

  @Column()
  admin:boolean;

  @Column()
  isSubscriber:boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
