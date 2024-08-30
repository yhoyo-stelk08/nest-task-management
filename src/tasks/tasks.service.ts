import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Tasks, TaskStatus } from './tasks.model';

@Injectable()
export class TasksService {
  private tasks: Tasks[] = [];

  findAll(): Tasks[] {
    return this.tasks;
  }

  create(title: string, description: string): Tasks {
    const tasks: Tasks = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(tasks);

    return tasks;
  }
}
