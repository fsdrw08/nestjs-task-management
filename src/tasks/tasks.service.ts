import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.modle';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';

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

  getTaskByID(id: string): Task {
    return this.tasks.find(task => task.id === id);
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
    this.tasks.splice(
      this.tasks.findIndex(
        task => task.id === id), 1);
  }
}
