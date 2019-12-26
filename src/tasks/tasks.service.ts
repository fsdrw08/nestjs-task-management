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
  ) { }
  //   private tasks: Task[] = [
  //     {
  //         id: 'd611ddb0-ec98-11e9-98a0-9f86c02b42da',
  //         title: 'test title 1',
  //         description: 'test description 1',
  //         status: TaskStatus.OPEN,
  //     },
  //     {
  //         id: 'd9aeda90-ec98-11e9-98a0-9f86c02b42da',
  //         title: 'test title 2',
  //         description: 'test description 2',
  //         status: TaskStatus.OPEN,
  //     },
  //     {
  //         id: 'dc900180-ec98-11e9-98a0-9f86c02b42da',
  //         title: 'test title 3',
  //         description: 'test description 3',
  //         status: TaskStatus.OPEN,
  //     },
  // ];

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

  //   updateTaskStatus(id: string, status: TaskStatus): Task {
  //     this.getTaskByID(id).status = status;
  //     return this.getTaskByID(id);
  //   }

  //   deleteTask(id: string) {
  //     const found = this.getTaskByID(id);
  //     this.tasks = this.tasks.filter(task => task.id !== found.id);
  //     /*this.tasks.splice(
  //       this.tasks.findIndex(
  //         task => task.id === id), 1);*/
  //   }
}
