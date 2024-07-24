import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  private tasks: Array<Task> = [];
  create(createDto: CreateTaskDto): Task {
    const task: Task = {
      id: (Math.random() + 1).toString(36).substring(7),
      title: createDto.title,
      description: createDto.description,
      completed: false,
      createDate: new Date(),
    };
    this.tasks.push(task);
    return task;
  }

  getAll(): Array<Task> {
    return this.tasks;
  }

  getById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      return task;
    }

    throw new NotFoundException(`Task not found with ID ${id}`);
  }

  update(id: string, updateTask: Task): Task {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index == -1) {
      throw new NotFoundException(`Task not found with ID ${id}`);
    }
    this.tasks[index] = updateTask;
    return updateTask;
  }

  remove(id: string): void {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index == -1) {
      throw new NotFoundException(`Task not found with ID ${id}`);
    }
    this.tasks.splice(index, 1);
  }
}
