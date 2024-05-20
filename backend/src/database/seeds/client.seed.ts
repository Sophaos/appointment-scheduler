import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Client } from 'src/clients/entities/client.entity';

export default class ClientSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await dataSource.query('TRUNCATE "client" RESTART IDENTITY CASCADE;');
    const factory = await factoryManager.get(Client);
    await factory.saveMany(5);
    console.log('🚀 ~ Client seeder ~ Success !');
  }
}
