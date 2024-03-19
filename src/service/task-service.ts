interface Task {
  id: number;
  title: string;
}

let tasks: Task[] = [];

export class TaskService {
  public async getAllTasks(): Promise<Task[]> {
    return tasks;
  }

  public async getTaskById(taskId: number): Promise<Task | undefined> {
    const task = tasks.find((t) => t.id === taskId);

    if (!task) {
      throw new Error(`Task with ID ${taskId} not found`);
    }

    return task;
  }

  public async createTask(title: string): Promise<Task | undefined> {
    const newTask: Task = { id: tasks.length + 1, title };
    tasks.push(newTask);
    return newTask;
  }

  public async updateTask(
    taskId: number,
    title: string,
  ): Promise<Task | undefined> {
    if (!title || title.trim() === '') {
      throw new Error('Title is required and must be a non-empty string');
    }
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex !== -1) {
      tasks[taskIndex].title = title;
      return tasks[taskIndex];
    }

    return undefined;
  }

  public async deleteTask(taskId: number): Promise<Task | undefined> {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    return taskIndex !== -1
      ? tasks.splice(taskIndex, 1)[0]
      : (() => {
          throw new Error(`Task with ID ${taskId} not found`);
        })();
  }
}
