import { setSeederFactory } from 'typeorm-extension';
import { Expert } from 'src/experts/entities/expert.entity';

export default setSeederFactory(Expert, (faker) => {
  const service = new Expert({
    nickname: faker.person.firstName(),
    color: faker.color.rgb({ format: 'hex', prefix: '' }),
  });
  return service;
});
