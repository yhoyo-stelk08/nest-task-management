import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
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

  delete(id: string): Tasks {
    const task = this.findOne(id);
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return task;
  }

  updateStatus(id: string, updateTaskStatusDto: UpdateTaskStatusDto): Tasks {
    const task = this.findOne(id);
    task.status = updateTaskStatusDto.status;
    return task;
  }

  findWithFilters(filterDto: any): Tasks[] {
    const { status, search } = filterDto;
    let tasks = this.findAll();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    return tasks;
  }
}
