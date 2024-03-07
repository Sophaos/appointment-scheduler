import { PartialType } from '@nestjs/mapped-types';
import { CreateExpertDto } from './create-expert.dto';

export class UpdateExpertDto extends PartialType(CreateExpertDto) {}
