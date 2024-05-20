import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from './clients/clients.module';
import { ExpertsModule } from './experts/experts.module';
import { ServicesModule } from './services/services.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { dataSourceOptions } from './database/data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    ClientsModule,
    ExpertsModule,
    ServicesModule,
    AppointmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
