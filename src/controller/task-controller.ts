import { Request, Response } from 'express';
import { HttpStatus, eStatusError } from '../enum/status-enum';
import { TaskService } from '../service/task-service';

export class TaskController {
  taskService = new TaskService();

  public async getTasks(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await this.taskService.getAllTasks();
      res.json(tasks);
    } catch (err: any) {
      console.error(err);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: err.message });
    }
  }

  public async getTasksByID(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const taskId = parseInt(id, 10);
      const task = await this.taskService.getTaskById(taskId);
      res.json(task);
    } catch (err: any) {
      console.error(err);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: err.message });
    }
  }

  public async createTask(req: Request, res: Response): Promise<void> {
    try {
      const { title } = req.body;

      if (!title || title.trim() === '') {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Title is required and must be a non-empty string',
        });
        return;
      }

      const newTask = await this.taskService.createTask(title);

      res.json(newTask);
    } catch (err: any) {
      console.error(err);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: err.message });
    }
  }

  public async updateTask(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { title } = req.body;
      const taskId = parseInt(id, 10);

      const updatedTask = await this.taskService.updateTask(taskId, title);

      if (updatedTask) {
        res.json(updatedTask);
      }

      res.status(HttpStatus.NOT_FOUND).json({
        message: `${eStatusError.Error404}. Please check the provided ID.`,
      });
    } catch (err: any) {
      console.error(err);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: err.message });
    }
  }

  public async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const taskId = parseInt(id, 10);

      const deletedTask = await this.taskService.deleteTask(taskId);

      if (deletedTask) {
        res.json(deletedTask);
      }

      res.status(HttpStatus.NOT_FOUND);
    } catch (err: any) {
      console.error(err);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: err.message });
    }
  }
}
