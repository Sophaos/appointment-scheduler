import { setSeederFactory } from 'typeorm-extension';
import { Service } from 'src/services/entities/service.entity';

export default setSeederFactory(Service, (faker) => {
  const service = new Service({
    name: faker.commerce.productName(),
    color: faker.color.rgb({ format: 'hex', prefix: '' }),
    duration: faker.helpers.rangeToNumber({ min: 2, max: 6 }) * 15,
  });
  return service;
});
