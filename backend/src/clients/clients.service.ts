import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly expertsRepository: Repository<Client>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(createClientDto: CreateClientDto) {
    const item = new Client(createClientDto);
    await this.entityManager.save(item);
  }

  async findAll() {
    return this.expertsRepository.find();
  }

  async findOne(id: number) {
    return this.expertsRepository.findOneBy({ id });
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const item = this.expertsRepository.findOneBy({ id });
    await this.entityManager.save(item);
  }

  async remove(id: number) {
    this.expertsRepository.delete(id);
  }
}
