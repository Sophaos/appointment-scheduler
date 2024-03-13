import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Service } from 'src/services/entities/service.entity';
import { Client } from 'src/clients/entities/client.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentsRepository: Repository<Appointment>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(createAppointmentDto: CreateAppointmentDto) {
    const { serviceId, clientId, ...data } = createAppointmentDto;
    const service = await this.entityManager.findOneBy(Service, {
      id: serviceId,
    });

    const client = await this.entityManager.findOneBy(Client, {
      id: clientId,
    });

    const item = new Appointment({
      ...data,
      service,
      client,
    });

    await this.entityManager.save(item);
  }

  async findAll() {
    return this.appointmentsRepository.find();
  }

  async findOne(id: number) {
    return this.appointmentsRepository.findOneBy({ id });
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    const item = this.appointmentsRepository.findOneBy({ id });
    // item.xys = updateServiceDto.xyz
    await this.entityManager.save(item);
  }

  async remove(id: number) {
    this.appointmentsRepository.delete(id);
  }
}
