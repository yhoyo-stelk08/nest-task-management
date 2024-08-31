import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './tasks.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async findOne(id: string): Promise<Task> {
    try {
      const task = await this.taskRepository.findOneOrFail({ where: { id } });

      if (!task) {
        throw new NotFoundException(`Task with ID "${id}" not found`);
      }

      return task;
    } catch (error) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const tasks = this.taskRepository.create(createTaskDto);
      return await this.taskRepository.save(tasks);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async remove(id: string): Promise<Task> {
    try {
      const task = await this.findOne(id);

      if (!task) {
        throw new NotFoundException(`Task with ID "${id}" not found`);
      }
      return await this.taskRepository.remove(task);
    } catch (error) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async updateStatus(
    id: string,
    updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    try {
      const tasks = await this.findOne(id);

      if (!tasks) {
        throw new NotFoundException(`Task with ID "${id}" not found`);
      }

      tasks.status = updateTaskStatusDto.status;

      return await this.taskRepository.save(tasks);
    } catch (error) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async findWithFilters(filterDto: GetTaskFilterDto): Promise<Task[]> {
    try {
      const { status, search } = filterDto;

      const query = this.taskRepository.createQueryBuilder('task');

      if (status) {
        query.andWhere('task.status = :status', { status });
      }

      if (search) {
        query.andWhere(
          'task.title LIKE :search OR task.description LIKE :search',
          { search: `%${search}%` },
        );
      }

      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
