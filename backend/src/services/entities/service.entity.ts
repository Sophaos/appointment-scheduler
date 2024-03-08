import { Appointment } from 'src/appointments/entities/appointment.entity';
import { AbstractEntity } from 'src/database/abstract.entity';
import { Expert } from 'src/experts/entities/expert.entity';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
export class Service extends AbstractEntity<Service> {
  @Column()
  name: string;

  @Column()
  color: string;

  @ManyToOne(() => Expert, (expert) => expert.services)
  expert: Expert;

  @ManyToMany(() => Appointment, (appointment) => appointment.services)
  appointments: Appointment[];
}
