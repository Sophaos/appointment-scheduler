import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Client } from 'src/clients/entities/client.entity';
import { Expert } from 'src/experts/entities/expert.entity';
import { Service } from 'src/services/entities/service.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

export const dataSourceOptions: TypeOrmModuleOptions & SeederOptions = {
  type: 'postgres',
  host: 'db', // revert when using full docker yaml
  // host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'mysecretpassword',
  database: 'postgres',
  synchronize: true, // do not set it true in production application
  autoLoadEntities: true,
  entities: [Service, Appointment, Client, Service, Expert], // need to be added for seeding
  seeds: ['src/database/seeds/**/*{.ts,.js}'],
  factories: ['src/database/factories/**/*{.ts,.js}'],
};

export const dataSource = new DataSource(
  dataSourceOptions as DataSourceOptions & SeederOptions,
);
