# Workflow

## Installation

Pre-requisites : [Installing CLI](https://docs.nestjs.kr/)

```bash
npm i -g @nestjs/cli
nest new [project-name]
```

postgres 사용
[Database](https://docs.nestjs.kr/techniques/database)

```bash
# DB
npm install --save @nestjs/typeorm typeorm pg
```

[Configuration](https://docs.nestjs.kr/techniques/configuration)

```bash
# Config
npm i --save @nestjs/config
```

.env 파일 생성 .env.dev .env.test .env.prod

```typescript
import dotenv from 'dotenv';
```

이처럼 사용 가능하게 tsconfig.json 에 추가
CommonJS 모듈을 es6 모듈 방식으로

```json
    "esModuleInterop": true,
```

package.json 에 환경변수 추가 + .gitignore 에 추가

```json
"scripts": {
    "start": "cross-env NODE_ENV=prod nest start",
    "start:dev": "cross-env NODE_ENV=dev nest start --watch",
},
```

yup 설치 (joi 대신)

```bash
npm i --save yup
```

### TypeORM Migration setting

src/database.config.ts 생성

```typescript
# src/database.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import dotenv from 'dotenv';
import { object, string, number } from 'yup';

dotenv.config({
  path: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
});

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrationsRun: false,
  logging: process.env.NODE_ENV !== 'prod' && process.env.NODE_ENV !== 'test',
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  autoLoadEntities: true,
  keepConnectionAlive: true,
};

export = config;
```

Pre-requisites : [Installing CLI](<(https://typeorm.io/#/using-cli/installing-cli)>)
[문서](https://typeorm.io/#/migrations)

package.json 에 추가

```json
"scripts": {
    "typeorm": "cross-env NODE_ENV=dev node --require ts-node/register ./node_modules/typeorm/cli.js --config src/database.config.ts",
    "db:migrate": "npm run typeorm migration:run",
    "db:revert": "npm run typeorm migration:revert",
    "db:create": "npm run typeorm migration:create -- -n",
    "db:generate": "npm run typeorm migration:generate -- -n"
  },
```

graphql 설치

```bash
npm i @nestjs/graphql @nestjs/apollo graphql apollo-server-express
```

app.module.ts 에 typeorm, graphql 추가

DTO validation

```bash
npm i --save class-validator class-transformer
```

main.ts 에 ValidationPipe 추가

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## Support

## Stay in touch

## License

[MIT licensed](LICENSE).
