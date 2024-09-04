import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

console.log("process.env.DATABASE_UR", process.env.DATABASE_UR)
const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  url: "postgres://postgres:Superman1234@database-1.c7g8c84kuof9.us-east-1.rds.amazonaws.com:5432/todo-app",
  entities: ['dist/**/*.entity{.js,.ts}'],
  synchronize: false,
  migrations: ['dist/database/*.{ts,js}'],
  logging: true,
  migrationsRun: true,
};

export default databaseConfig;
