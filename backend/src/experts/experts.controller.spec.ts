import { Test, TestingModule } from '@nestjs/testing';
import { ExpertsController } from './experts.controller';
import { ExpertsService } from './experts.service';

describe('ExpertsController', () => {
  let controller: ExpertsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpertsController],
      providers: [ExpertsService],
    }).compile();

    controller = module.get<ExpertsController>(ExpertsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
