import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'user',
  password: 'pass',
  database: 'data',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
