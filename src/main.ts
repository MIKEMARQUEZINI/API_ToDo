import bodyParser = require('body-parser');
import cors = require('cors');
import { Application, Request, Response } from 'express';
import { TaskController } from './controller/task-controller';
import { Task } from './service/task-service';
import express = require('express');

const app: Application = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());
let tasks: Task[] = [];

const taskController = new TaskController(tasks);

app.get('/tasks', async (req: Request, res: Response) => {
  await taskController.getTasks(req, res);
});

app.get('/tasks/:id', async (req: Request, res: Response) => {
  await taskController.getTasksByID(req, res);
});

app.post('/tasks', async (req: Request, res: Response) => {
  await taskController.createTask(req, res);
});

app.put('/tasks/:id', async (req: Request, res: Response) => {
  await taskController.updateTask(req, res);
});

app.delete('/tasks/:id', async (req: Request, res: Response) => {
  await taskController.deleteTask(req, res);
});

app.listen(PORT, () => {
  console.log(`Server is running: ✔`);
});
