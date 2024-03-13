import { Appointment } from 'src/appointments/entities/appointment.entity';
import { AbstractEntity } from 'src/database/abstract.entity';
import { Expert } from 'src/experts/entities/expert.entity';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';

@Entity()
export class Service extends AbstractEntity<Service> {
  @Column()
  name: string;

  @Column()
  color: string;

  @ManyToMany(() => Expert, (expert) => expert.services)
  experts: Expert[];

  @OneToMany(() => Appointment, (appointment) => appointment.service)
  appointments: Appointment[];
}
