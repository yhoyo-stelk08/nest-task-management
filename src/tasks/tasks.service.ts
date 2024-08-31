import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { Tasks, TaskStatus } from './tasks.model';

@Injectable()
export class TasksService {
  private tasks: Tasks[] = [];

  findAll(): Tasks[] {
    return this.tasks;
  }

  findOne(id: string): Tasks {
    console.log(id);
    return this.tasks.find((task) => task.id === id);
  }

  create(createTaskDto: CreateTaskDto): Tasks {
    const { title, description } = createTaskDto;
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
