import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  url: "postgres://postgres:Superman1234@todo-app.c7g8c84kuof9.us-east-1.rds.amazonaws.com:5432/todo-app",
  entities: ['dist/**/*.entity{.js,.ts}'],
  synchronize: false,
  migrations: ['dist/database/*.{ts,js}'],
  logging: true,
  migrationsRun: true,
};

export default databaseConfig;
