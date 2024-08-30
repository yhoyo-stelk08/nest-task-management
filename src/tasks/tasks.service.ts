import { Injectable } from '@nestjs/common';
import { Tasks } from './tasks.model';

@Injectable()
export class TasksService {
  private tasks: Tasks[] = [];

  findAll(): Tasks[] {
    return this.tasks;
  }
}
