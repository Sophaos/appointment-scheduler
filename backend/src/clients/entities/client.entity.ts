import { Appointment } from 'src/appointments/entities/appointment.entity';
import { AbstractEntity } from 'src/database/abstract.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Client extends AbstractEntity<Client> {
  @Column()
  nickname: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column()
  email: string;

  @Column()
  note: string;

  @OneToMany(() => Appointment, (appointment) => appointment.client)
  appointments: Appointment[];
}
