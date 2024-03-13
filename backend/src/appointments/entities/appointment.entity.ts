import { Client } from 'src/clients/entities/client.entity';
import { AbstractEntity } from 'src/database/abstract.entity';
import { Expert } from 'src/experts/entities/expert.entity';
import { Service } from 'src/services/entities/service.entity';
import { Entity, Column, ManyToOne, JoinColumn, JoinTable } from 'typeorm';

@Entity()
export class Appointment extends AbstractEntity<Appointment> {
  @Column()
  title: string;

  @Column({ type: 'timestamptz' })
  start: Date;

  @Column({ type: 'timestamptz' })
  end: Date;

  @Column()
  notes: string;

  @ManyToOne(() => Client, (client) => client.appointments)
  @JoinColumn()
  client: Client;

  @ManyToOne(() => Service, (service) => service.appointments)
  @JoinTable()
  service: Service;

  @ManyToOne(() => Expert, (expert) => expert.appointments)
  @JoinTable()
  expert: Expert;
}
