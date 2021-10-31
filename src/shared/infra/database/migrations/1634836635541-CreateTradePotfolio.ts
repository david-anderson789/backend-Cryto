/* eslint-disable import/prefer-default-export */
import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';

export class CreateTradePotfolio1634836635541 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'wallets_trades',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'gen_random_uuid()',
          },
          {
            name: 'wallet_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'currency',
            type: 'varchar',
          },
          {
            name: 'symbol',
            type: 'varchar',
          },
          {
            name: 'date',
            type: 'timestamp with time zone',
            isNullable: false,
          },
          {
            name: 'value_currency',
            type: 'float',
          },
          {
            name: 'image',
            type: 'varchar',
          },
          {
            name: 'qtd_currency',
            type: 'float',
          },
          {
            name: 'amount_fiat',
            type: 'float',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
    await queryRunner.createForeignKey('wallets_trades', new TableForeignKey({
      name: 'walletsOfTrades',
      columnNames: ['wallet_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'wallets',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('wallets_trades', 'walletsOfTrades');
    await queryRunner.dropTable('wallets_trades');
  }
}
