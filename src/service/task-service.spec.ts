import { Task, TaskService } from './task-service';

describe('TaskService', () => {
  let taskService: TaskService;
  let tasks: Task[];

  beforeEach(() => {
    tasks = [
      { id: 1, title: 'Task 1' },
      { id: 2, title: 'Task 2' },
      { id: 3, title: 'Task 3' },
    ];

    taskService = new TaskService(tasks);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(taskService).toBeDefined();
  });

  describe('getAllTasks', () => {
    it('should return all tasks', async () => {
      const result = await taskService.getAllTasks();

      expect(result).toEqual(tasks);
    });

    it('should return an empty array if there are no tasks', async () => {
      const emptyTaskService = new TaskService([]);

      const result = await emptyTaskService.getAllTasks();
      expect(result).toEqual([]);
    });
  });

  describe('getTaskById', () => {
    it('should return a task by ID', async () => {
      const taskId = 1;
      const result = await taskService.getTaskById(taskId);

      expect(result).toEqual(tasks[0]);
    });

    it('should throw an error if the task is not found', async () => {
      const taskId = 4;

      await expect(taskService.getTaskById(taskId)).rejects.toThrow(
        `Task with ID ${taskId} not found`,
      );
    });
  });

  describe('createTask', () => {
    it('should create a new task', async () => {
      const title = 'Task 4';
      const result = await taskService.createTask(title);

      expect(result).toEqual({ id: 4, title });
    });
  });

  describe('updateTask', () => {
    it('should update a task', async () => {
      const taskId = 1;
      const title = 'Updated Task 1';
      const result = await taskService.updateTask(taskId, title);

      expect(result).toEqual({ id: 1, title });
    });

    it('should throw an error if the title is empty', async () => {
      const taskId = 1;
      const title = '';

      await expect(taskService.updateTask(taskId, title)).rejects.toThrow(
        'Title is required and must be a non-empty string',
      );
    });

    it('should throw an error if the task is not found', async () => {
      const taskId = 4;
      const title = 'Task 4';

      await expect(taskService.updateTask(taskId, title)).rejects.toThrow(
        `Task with ID ${taskId} not found`,
      );
    });
  });

  describe('deleteTask', () => {
    it('should delete a task by ID', async () => {
      const taskId = 1;
      const deletedTask = tasks[0];
      const result = await taskService.deleteTask(taskId);

      expect(result).toEqual(deletedTask);
      expect(tasks).not.toContain(deletedTask);
    });

    it('should return undefined if the task is not found', async () => {
      const taskId = 4;

      const result = await taskService.deleteTask(taskId);

      expect(result).toBeUndefined();
    });
  });
});
