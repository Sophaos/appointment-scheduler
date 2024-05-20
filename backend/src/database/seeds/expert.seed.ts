import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Expert } from 'src/experts/entities/expert.entity';

export default class ExpertSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await dataSource.query('TRUNCATE "expert" RESTART IDENTITY CASCADE;');
    const factory = await factoryManager.get(Expert);
    await factory.saveMany(5);
    console.log('🚀 ~ Expert seeder ~ Success !');
  }
}
