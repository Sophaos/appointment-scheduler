import { setSeederFactory } from 'typeorm-extension';
import { Client } from 'src/clients/entities/client.entity';

export default setSeederFactory(Client, (faker) => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const service = new Client({
    nickname: faker.person.middleName(),
    firstName,
    lastName,
    phoneNumber: faker.phone.number('(###) ###-####'),
    email: faker.internet.email({ firstName, lastName }),
    note: faker.lorem.sentence(),
  });
  return service;
});
