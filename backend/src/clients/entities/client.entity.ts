import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickname: string;

  @Column()
  phoneNumber: string;

  @Column()
  rating: number;

  @Column()
  note: string;

  @OneToMany(() => Appointment, (appointment) => appointment.client)
  appointments: Appointment[];
}
