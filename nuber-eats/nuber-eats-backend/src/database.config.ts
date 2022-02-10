import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import dotenv from 'dotenv';
import { object, string, number } from 'yup';

dotenv.config({
  path: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
});

const schema = object().shape({
  NODE_ENV: string().oneOf(['dev', 'test']),
  DB_HOST: string().required(),
  DB_PORT: number().required(),
  DB_USERNAME: string().required(),
  DB_PASSWORD: string().required(),
  DB_DATABASE: string().required(),
});

schema.validate({
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE: process.env.DB_DATABASE,
});

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: process.env.NODE_ENV === 'dev',
  migrationsRun: false,
  logging: process.env.NODE_ENV !== 'prod' && process.env.NODE_ENV !== 'test',
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  autoLoadEntities: true,
  keepConnectionAlive: true,
};
