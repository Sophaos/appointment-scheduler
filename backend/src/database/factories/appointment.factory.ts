import { setSeederFactory } from 'typeorm-extension';
import { Appointment } from 'src/appointments/entities/appointment.entity';

export default setSeederFactory(Appointment, (faker) => {
  const service = new Appointment({
    // startTime: faker.person.middleName(),
    duration: faker.helpers.rangeToNumber({ min: 2, max: 6 }) * 15,
    status: faker.lorem.sentence(),
    // client: faker,
    // service: faker,
    // expert: faker,
    notes: faker.lorem.sentence(),
  });
  return service;
});
