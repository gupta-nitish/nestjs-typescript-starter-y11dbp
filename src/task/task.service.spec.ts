import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

describe('TaskService', () => {
  let service: TaskService;
  let createTestTask: CreateTaskDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService],
    }).compile();

    service = module.get<TaskService>(TaskService);
    createTestTask = {
      title: 'Task1',
      description: 'Testing test case',
      completed: false,
    };
  });

  it('should create task', () => {
    const result = service.create(createTestTask);
    expect(result).toBeInstanceOf(Object);
    expect(result.title).toBe(createTestTask.title);
    expect(service.getAll().length).toBe(1);
  });

  it('should get all tasks', () => {
    service.create(createTestTask);
    service.create(createTestTask);
    expect(service.getAll().length).toBe(2);
  });

  it('should get task by id', () => {
    const result = service.create(createTestTask);
    expect(service.getById(result.id)).toBe(result);
  });

  it('should throw error if id not exist', () => {
    try {
      service.getById('IdNotExist');
    } catch (e) {
      expect(e.message).toBe('Task not found with ID IdNotExist');
    }
  });

  it('should update task by id', () => {
    const result : Task = service.create(createTestTask);
      result.completed = true;
      result.title =  'updatedTask'
      result.description= 'updated Task Description'
    service.update(result.id, result);
    const updatedResult = service.getById(result.id);
    expect(updatedResult).toBe(result);
  });

  it('should throw error if id not exist for update', () => {
    try {
      const result : Task = service.create(createTestTask);
      result.completed = true;
      result.title =  'updatedTask'
      result.description= 'updated Task Description'
      service.update('IdNotExist', result);
    } catch (e) {
      expect(e.message).toBe('Task not found with ID IdNotExist');
    }
  });

  it('should delete task by id', () => {
    const result = service.create(createTestTask);
    service.remove(result.id);
    expect(service.getAll()).not.toContain(result);
  });

  it('should throw error if id not exist for delete', () => {
    try {
      service.remove('IdNotExist');
    } catch (e) {
      expect(e.message).toBe('Task not found with ID IdNotExist');
    }
  });
});
