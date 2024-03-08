import { Client } from 'src/clients/entities/client.entity';
import { AbstractEntity } from 'src/database/abstract.entity';
import { Service } from 'src/services/entities/service.entity';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

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

  @ManyToMany(() => Service, (service) => service.appointments)
  @JoinTable()
  services: Service[];
}
