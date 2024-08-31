import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  findAll(@Query() filterDto: GetTaskFilterDto) {
    if (Object.keys(filterDto).length) {
      return this.tasksService.findWithFilters(filterDto);
    }
    return this.tasksService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() status: UpdateTaskStatusDto,
  ) {
    return this.tasksService.updateStatus(id, status);
  }
}
