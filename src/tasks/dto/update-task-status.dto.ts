import { IsNotEmpty, IsString } from 'class-validator';
import { TaskStatus } from '../tasks.model';

export class UpdateTaskStatusDto {
  @IsString()
  @IsNotEmpty()
  status: TaskStatus;
}
