import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

describe('TaskController', () => {
  let controller: TaskController;
  let createTestTask: CreateTaskDto;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [TaskService],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    createTestTask = {
      title: 'Task1',
      description: 'Testing test case',
      completed: false,
    };
  });

  describe('getAll', () => {
    it('should return array', () => {
      expect(controller.getAll()).toBeInstanceOf(Array);
    });
  });
  describe('getAll', () => {
    it('should return array', () => {
      expect(controller.getAll()).toBeInstanceOf(Array);
    });

    it('should get all tasks', () => {
      controller.create(createTestTask);
      controller.create(createTestTask);
      expect(controller.getAll().length).toBe(2);
    });
  });

  describe('create', () => {
    it('should create task', () => {
      const result = controller.create(createTestTask);
      expect(result).toBeInstanceOf(Object);
      expect(result.title).toBe(createTestTask.title);
      expect(controller.getAll().length).toBe(1);
    });
  });

  it('should get task by id', () => {
    const result = controller.create(createTestTask);
    expect(controller.getById(result.id)).toBe(result);
  });

  it('should throw error if id not exist', () => {
    try {
      controller.getById('IdNotExist');
    } catch (e) {
      expect(e.message).toBe('Task not found with ID IdNotExist');
    }
  });

  it('should update task by id', () => {
    const result = controller.create(createTestTask);
    result.completed = true;
    result.title =  'updatedTask'
    result.description= 'updated Task Description'
    controller.update(result.id, result);

    const updatedResult = controller.update(result.id, result);
    expect(updatedResult).toBe(result);
  });

  it('should throw error if id not exist for update', () => {
    try {
      const result = controller.create(createTestTask);
      result.completed = true;
      result.title =  'updatedTask'
      result.description= 'updated Task Description'
      controller.update('IdNotExist', result);
    } catch (e) {
      expect(e.message).toBe('Task not found with ID IdNotExist');
    }
  });

  it('should delete task by id', () => {
    const result = controller.create(createTestTask);
    controller.remove(result.id);
    expect(controller.getAll()).not.toContain(result);
  });

  it('should throw error if id not exist for delete', () => {
    try {
      controller.remove('IdNotExist');
    } catch (e) {
      expect(e.message).toBe('Task not found with ID IdNotExist');
    }
  });
});
