import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  //   getAllTasks(): Task[] {
  //       return this.tasks;
  //   }

  //   getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //     const { status, search } = filterDto;

  //     let tasks: Task[] = this.getAllTasks();

  //     if (status) {
  //       tasks = tasks.filter(task => task.status === status);
  //     }

  //     if (search) {
  //       tasks = tasks.filter(task =>
  //         task.title.includes(search) ||
  //         task.description.includes(search),
  //       );
  //     }
  //     return tasks;
  //   }

  async getTaskByID(id: number): Promise<Task> {
    //  http://typeorm.delightful.studio/classes/_repository_repository_.repository.html#findone
    const found = await this.taskRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`The id "${id}" is not found`);
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskByID(id);
    task.status = status;
    await task.save();
    return task
  }

  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
  }
}
