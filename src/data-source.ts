import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config(); // 加载 .env 文件中的环境变量
import * as path from 'path';
console.log('process.env.DB_NAME',process.env.DB_NAME);

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [path.join(__dirname, '/**/*.entity.{ts,js}')],
  migrations: [path.join(__dirname, '/migrations/*.{ts,js}')],
  synchronize: false, // 生产环境必须为 false
});