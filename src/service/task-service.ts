export interface Task {
  id: number;
  title: string;
}

export class TaskService {
  private tasks: Task[];
  constructor(tasks: Task[]) {
    this.tasks = tasks;
  }
  async getAllTasks(): Promise<Task[]> {
    return this.tasks;
  }

  async getTaskById(taskId: number): Promise<Task | undefined> {
    const task = this.tasks.find((t) => t.id === taskId);

    if (!task) {
      throw new Error(`Task with ID ${taskId} not found`);
    }

    return task;
  }

  async createTask(title: string): Promise<Task | undefined> {
    const newTask: Task = { id: this.tasks.length + 1, title };
    this.tasks.push(newTask);
    return newTask;
  }

  async updateTask(taskId: number, title: string): Promise<Task | undefined> {
    if (!title || title.trim() === '') {
      throw new Error('Title is required and must be a non-empty string');
    }

    const taskToUpdate = this.tasks.find((t) => t.id === taskId);

    if (!taskToUpdate) {
      throw new Error(`Task with ID ${taskId} not found`);
    }

    taskToUpdate.title = title;

    return taskToUpdate;
  }

  async deleteTask(taskId: number): Promise<Task | undefined> {
    const taskIndex = this.tasks.findIndex((task) => task.id === taskId);

    if (taskIndex !== -1) {
      const deletedTask = this.tasks.splice(taskIndex, 1);
      return deletedTask[0];
    }

    return undefined;
  }
}
