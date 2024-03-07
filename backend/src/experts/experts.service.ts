import { Injectable } from '@nestjs/common';
import { CreateExpertDto } from './dto/create-expert.dto';
import { UpdateExpertDto } from './dto/update-expert.dto';

@Injectable()
export class ExpertsService {
  create(createExpertDto: CreateExpertDto) {
    return 'This action adds a new expert';
  }

  findAll() {
    return `This action returns all experts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} expert`;
  }

  update(id: number, updateExpertDto: UpdateExpertDto) {
    return `This action updates a #${id} expert`;
  }

  remove(id: number) {
    return `This action removes a #${id} expert`;
  }
}
