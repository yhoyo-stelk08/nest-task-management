import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Tasks } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  findAll(): Tasks[] {
    return this.tasksService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string): Tasks {
    return this.tasksService.findOne(id);
  }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Tasks {
    return this.tasksService.create(createTaskDto);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): Tasks {
    return this.tasksService.delete(id);
  }
}
