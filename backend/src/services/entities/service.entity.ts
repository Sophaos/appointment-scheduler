import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Expert } from 'src/experts/entities/expert.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  color: string;

  @ManyToOne(() => Expert, (expert) => expert.services)
  expert: Expert;

  @ManyToMany(() => Appointment, (appointment) => appointment.services)
  appointments: Appointment[];
}
