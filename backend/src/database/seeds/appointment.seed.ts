import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Client } from 'src/clients/entities/client.entity';
import { Service } from 'src/services/entities/service.entity';
import { Expert } from 'src/experts/entities/expert.entity';
import { faker } from '@faker-js/faker';

export default class AppointmentSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await dataSource.query('TRUNCATE "appointment" RESTART IDENTITY CASCADE;');
    await dataSource.query('TRUNCATE "client" RESTART IDENTITY CASCADE;');
    await dataSource.query('TRUNCATE "service" RESTART IDENTITY CASCADE;');
    await dataSource.query('TRUNCATE "expert" RESTART IDENTITY CASCADE;');

    const clientFactory = await factoryManager.get(Client);
    const clients = await clientFactory.saveMany(10);

    const serviceFactory = await factoryManager.get(Service);
    const services = await serviceFactory.saveMany(10);

    const expertFactory = await factoryManager.get(Expert);
    const experts = await expertFactory.saveMany(10);

    const repository = dataSource.getRepository(Appointment);

    const STATUS_OPTIONS: string[] = [
      'IDLE',
      'ARRIVED',
      'IN_PROGRESS',
      'DONE',
      'NO_SHOW',
    ];

    for (let i = 0; i < 25; i++) {
      await repository.save({
        startTime: getRandomDateBetween10AMTo5PM(),
        notes: faker.lorem.sentence(),
        duration: faker.helpers.rangeToNumber({ min: 2, max: 6 }) * 15,
        status:
          STATUS_OPTIONS[Math.floor(Math.random() * STATUS_OPTIONS.length)],
        client: clients[Math.floor(Math.random() * clients.length)],
        service: services[Math.floor(Math.random() * services.length)],
        expert: experts[Math.floor(Math.random() * experts.length)],
      });
    }

    console.log('🚀 ~ Appointment seeder ~ Success !');
  }
}

const getRandomDateBetween10AMTo5PM = () => {
  // Get today's date
  const today = new Date();

  // Define the range for hours (10 AM to 4 PM, inclusive)
  const minHour = 10;
  const maxHour = 16; // 4 PM (we'll add minutes to this)

  // Generate a random hour between minHour and maxHour
  const randomHour =
    Math.floor(Math.random() * (maxHour - minHour + 1)) + minHour;

  // Define possible minute intervals (0, 15, 30, 45)
  const minuteIntervals = [0, 15, 30, 45];

  // Generate a random index for minute intervals
  const randomMinuteIndex = Math.floor(Math.random() * minuteIntervals.length);
  const randomMinutes = minuteIntervals[randomMinuteIndex];

  // Set the hours and minutes of the current date to the random values
  today.setHours(randomHour, randomMinutes, 0, 0);

  // Ensure the date falls within the correct end boundary (5 PM)
  if (today.getHours() === 16) {
    today.setMinutes(0); // Set minutes to 0 if it's 4 PM to ensure within bounds
  }

  return today;
};
