import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Repository } from 'typeorm';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(createClientDto: CreateClientDto) {
    const item = new Client({
      ...createClientDto,
    });

    await this.entityManager.save(item);
  }

  async findAll() {
    return this.clientRepository.find();
  }

  async findOne(id: number) {
    return this.clientRepository.findOneBy({ id });
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const item = this.clientRepository.findOneBy({ id });
    await this.entityManager.save(item);
  }

  async remove(id: number) {
    this.clientRepository.delete(id);
  }
}
