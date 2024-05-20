import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Service } from 'src/services/entities/service.entity';

export default class ServiceSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await dataSource.query('TRUNCATE "service" RESTART IDENTITY CASCADE;');
    const factory = await factoryManager.get(Service);
    await factory.saveMany(5);
    console.log('🚀 ~ Service seeder ~ Success !');
  }
}
