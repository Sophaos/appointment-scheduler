import { Appointment } from 'src/appointments/entities/appointment.entity';
import { AbstractEntity } from 'src/database/abstract.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity()
export class Expert extends AbstractEntity<Expert> {
  @Column()
  nickname: string;

  @Column()
  color: string;

  // @ManyToMany(() => Service, (service) => service.experts)
  // @JoinTable()
  // services: Service[];

  @OneToMany(() => Appointment, (appointment) => appointment.expert)
  appointments: Appointment[];
}
