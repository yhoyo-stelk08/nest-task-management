import { Body, Controller, Get, Post } from '@nestjs/common';
import { Tasks } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  findAll(): Tasks[] {
    return this.tasksService.findAll();
  }

  @Post()
  create(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Tasks {
    return this.tasksService.create(title, description);
  }
}
