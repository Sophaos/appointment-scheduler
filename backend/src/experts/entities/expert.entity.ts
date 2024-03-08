import { AbstractEntity } from 'src/database/abstract.entity';
import { Service } from 'src/services/entities/service.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity()
export class Expert extends AbstractEntity<Expert> {
  @Column()
  nickname: string;

  @Column()
  color: string;

  @OneToMany(() => Service, (service) => service.expert)
  services: Service[];
}
