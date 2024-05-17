import { Client } from 'src/clients/entities/client.entity';
import { AbstractEntity } from 'src/database/abstract.entity';
import { Expert } from 'src/experts/entities/expert.entity';
import { Service } from 'src/services/entities/service.entity';
import { Entity, Column, ManyToOne } from 'typeorm';

@Entity()
export class Appointment extends AbstractEntity<Appointment> {
  @Column({ type: 'timestamptz' })
  startTime: Date;

  @Column()
  notes: string;

  @Column()
  duration: number;

  @Column()
  status: string;

  @ManyToOne(() => Client, (client) => client.appointments, {
    onDelete: 'CASCADE',
  })
  client: Client;

  @ManyToOne(() => Service, (service) => service.appointments, {
    onDelete: 'CASCADE',
  })
  service: Service;

  @ManyToOne(() => Expert, (expert) => expert.appointments, {
    onDelete: 'CASCADE',
  })
  expert: Expert;
}
