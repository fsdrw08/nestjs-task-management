import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.modle';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
        id: 'd611ddb0-ec98-11e9-98a0-9f86c02b42da',
        title: 'test title 1',
        description: 'test description 1',
        status: TaskStatus.OPEN,
    },
    {
        id: 'd9aeda90-ec98-11e9-98a0-9f86c02b42da',
        title: 'test title 2',
        description: 'test description 2',
        status: TaskStatus.OPEN,
    },
    {
        id: 'dc900180-ec98-11e9-98a0-9f86c02b42da',
        title: 'test title 3',
        description: 'test description 3',
        status: TaskStatus.OPEN,
    },
];

  getAllTasks(): Task[] {
      return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    let tasks: Task[] = this.getAllTasks();

    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(task =>
        task.title.includes(search) ||
        task.description.includes(search),
      );
    }
    return tasks;
  }

  getTaskByID(id: string): Task {
    const found = this.tasks.find(task => task.id === id);

    if (!found) {
      throw new NotFoundException(`The id "${id}" is not found`);
    } else {
      return found;
    }

  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto; // desctruction

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    this.getTaskByID(id).status = status;
    return this.getTaskByID(id);
  }

  deleteTask(id: string) {
    const found = this.getTaskByID(id);
    this.tasks = this.tasks.filter(task => task.id !== found.id);
    /*this.tasks.splice(
      this.tasks.findIndex(
        task => task.id === id), 1);*/
  }
}
