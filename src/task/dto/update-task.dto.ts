import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  title: String;
  description: String;
  completed: Boolean;
  completedDate?: Date;
}
