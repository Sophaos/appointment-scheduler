import { Test, TestingModule } from '@nestjs/testing';
import { ExpertsService } from './experts.service';

describe('ExpertsService', () => {
  let service: ExpertsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpertsService],
    }).compile();

    service = module.get<ExpertsService>(ExpertsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
