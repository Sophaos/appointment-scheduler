import { Module } from '@nestjs/common';
import { ExpertsService } from './experts.service';
import { ExpertsController } from './experts.controller';
import { Expert } from './entities/expert.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Expert])],
  controllers: [ExpertsController],
  providers: [ExpertsService],
})
export class ExpertsModule {}
