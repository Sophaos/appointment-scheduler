import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Repository } from 'typeorm';
import { Appointment } from 'src/appointments/entities/appointment.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(createClientDto: CreateClientDto) {
    const { appointmentIds, ...data } = createClientDto;
    const appointments = await this.entityManager.findBy(Appointment, {
      id: In(appointmentIds),
    });

    const item = new Client({
      ...data,
      appointments,
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
