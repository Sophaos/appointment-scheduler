import { Client } from 'src/clients/entities/client.entity';
import { Service } from 'src/services/entities/service.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'datetime' })
  start: Date;

  @Column({ type: 'datetime' })
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
