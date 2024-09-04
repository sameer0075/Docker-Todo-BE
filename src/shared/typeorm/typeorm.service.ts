import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  /**
   * @description configurations related to DB ;
   * @returns TypeOrmModuleOptions ;
   */
  public createTypeOrmOptions(): TypeOrmModuleOptions {
    dotenv.config();
    return {
      type: 'postgres',
      url: "postgres://postgres:Superman123@todo-app.c7g8c84kuof9.us-east-1.rds.amazonaws.com:5432/todo-app",
      entities: ['dist/**/*.entity{.js,.ts}'],
      synchronize: false,
      migrations: ['database/*.{ts,js}'],
      migrationsTableName: 'migration',
    };
  }
}