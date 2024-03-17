import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { EntityManager, In, Repository } from 'typeorm';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Expert } from 'src/experts/entities/expert.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly servicesRepository: Repository<Service>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(createServiceDto: CreateServiceDto) {
    const { appointmentIds, expertIds, ...data } = createServiceDto;
    const appointments = await this.entityManager.findBy(Appointment, {
      id: In(appointmentIds),
    });

    const experts = await this.entityManager.findBy(Expert, {
      id: In(expertIds),
    });

    const item = new Service({
      ...data,
      appointments,
      experts,
    });

    await this.entityManager.save(item);
  }

  async findAll() {
    return this.servicesRepository.find();
  }

  async findOne(id: number) {
    return this.servicesRepository.findOneBy({ id });
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    const item = this.servicesRepository.findOneBy({ id });
    // item.xys = updateServiceDto.xyz
    await this.entityManager.save(item);
  }

  async remove(id: number) {
    this.servicesRepository.delete(id);
  }
}
