import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager, Between } from 'typeorm';
import { Service } from 'src/services/entities/service.entity';
import { Client } from 'src/clients/entities/client.entity';
import { Expert } from 'src/experts/entities/expert.entity';
import { ReadAppointmenstDto } from './dto/read-appointments.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentsRepository: Repository<Appointment>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(createAppointmentDto: CreateAppointmentDto) {
    const { serviceId, clientId, expertId, ...data } = createAppointmentDto;
    const service = await this.entityManager.findOneBy(Service, {
      id: serviceId,
    });

    const expert = await this.entityManager.findOneBy(Expert, {
      id: expertId,
    });

    const client = await this.entityManager.findOneBy(Client, {
      id: clientId,
    });

    const item = new Appointment({
      ...data,
      service,
      client,
      expert,
    });

    await this.entityManager.save(item);
  }

  async findAll(readAppointmenstDto: ReadAppointmenstDto) {
    const view = readAppointmenstDto.view;
    const date = new Date(readAppointmenstDto.date);
    let where = {};

    switch (view.toLowerCase()) {
      case 'day':
        where = {
          startTime: Between(
            date,
            new Date(date.getTime() + 24 * 60 * 60 * 1000),
          ),
        };
        break;

      case 'week':
        const firstDayOfWeek = new Date(
          date.setDate(date.getDate() - date.getDay()),
        );
        const lastDayOfWeek = new Date(
          firstDayOfWeek.getTime() + 7 * 24 * 60 * 60 * 1000,
        );
        where = {
          startTime: Between(firstDayOfWeek, lastDayOfWeek),
        };
        break;

      case 'month':
        const firstDayOfMonth = new Date(
          date.getFullYear(),
          date.getMonth(),
          1,
        );
        const lastDayOfMonth = new Date(
          firstDayOfMonth.getFullYear(),
          firstDayOfMonth.getMonth() + 1,
          1,
        );
        where = {
          startTime: Between(firstDayOfMonth, lastDayOfMonth),
        };
        break;

      default:
        throw new Error('Invalid view specified.');
    }
    return this.appointmentsRepository.find({
      relations: {
        client: true,
        service: true,
        expert: true,
      },
      where,
    });
  }

  async findOne(id: number) {
    return this.appointmentsRepository.findOneBy({ id });
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    const item = await this.appointmentsRepository.findOneBy({ id });
    const { serviceId, clientId, expertId } = updateAppointmentDto;
    const service = await this.entityManager.findOneBy(Service, {
      id: serviceId,
    });

    const expert = await this.entityManager.findOneBy(Expert, {
      id: expertId,
    });

    const client = await this.entityManager.findOneBy(Client, {
      id: clientId,
    });
    item.client = client;
    item.expert = expert;
    item.service = service;
    item.duration = updateAppointmentDto.duration;
    item.notes = updateAppointmentDto.notes;
    item.startTime = updateAppointmentDto.startTime;
    item.status = updateAppointmentDto.status;
    await this.entityManager.save(item);
  }

  async remove(id: number) {
    await this.appointmentsRepository.delete(id);
  }
}
