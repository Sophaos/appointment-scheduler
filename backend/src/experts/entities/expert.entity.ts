import { Service } from 'src/services/entities/service.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Expert {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickname: string;

  @Column()
  color: string;

  @OneToMany(() => Service, (service) => service.expert)
  services: Service[];
}
