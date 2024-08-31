import { IsEnum, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../tasks-status-enum';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  @IsNotEmpty()
  status: TaskStatus;
}
