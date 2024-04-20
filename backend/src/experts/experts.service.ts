import { Injectable } from '@nestjs/common';
import { CreateExpertDto } from './dto/create-expert.dto';
import { UpdateExpertDto } from './dto/update-expert.dto';
import { Expert } from './entities/expert.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager, In } from 'typeorm';
import { Service } from 'src/services/entities/service.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';

@Injectable()
export class ExpertsService {
  constructor(
    @InjectRepository(Expert)
    private readonly expertsRepository: Repository<Expert>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(createExpertDto: CreateExpertDto) {
    const item = new Expert({
      ...createExpertDto,
    });

    await this.entityManager.save(item);
  }

  async findAll() {
    return this.expertsRepository.find();
  }

  async findOne(id: number) {
    return this.expertsRepository.findOneBy({ id });
  }

  async update(id: number, updateExpertDto: UpdateExpertDto) {
    const item = this.expertsRepository.findOneBy({ id });
    await this.entityManager.save(item);
  }

  async remove(id: number) {
    this.expertsRepository.delete(id);
  }
}
