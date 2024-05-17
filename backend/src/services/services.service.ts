import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly servicesRepository: Repository<Service>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(createServiceDto: CreateServiceDto) {
    const item = new Service({
      ...createServiceDto,
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
    const item = await this.servicesRepository.findOneBy({ id });
    item.name = updateServiceDto.name;
    item.color = updateServiceDto.color;
    item.duration = updateServiceDto.duration;
    await this.entityManager.save(item);
  }

  async remove(id: number) {
    this.servicesRepository.delete(id);
  }
}
