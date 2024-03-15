import bodyParser = require('body-parser');
import cors = require('cors');
import { Application, Request, Response } from 'express';
import { HttpStatus, eCrud, eStatusError } from './enum/status-enum';
import express = require('express');

const app: Application = express();
const PORT = 3000;
interface Task {
  id: number;
  title: string;
}

app.use(bodyParser.json());
app.use(cors());

let tasks: Task[] = [];

app.get('/tasks', (req: Request, res: Response) => {
  res.json(tasks);
});

app.get('/tasks/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const taskId = parseInt(id, 10);
    const task = tasks.find((t) => t.id === taskId);

    if (!task) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: `ID ${eStatusError.Error404}! Try again ` });
    }

    return res
      .status(HttpStatus.OK)
      .json({ message: `${eCrud.READ} ${JSON.stringify(task)}` });
  } catch (err) {
    console.error(err);
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: `${eStatusError.Error500}` });
  }
});

app.post('/tasks', (req: Request, res: Response) => {
  try {
    const { title } = req.body;

    if (!title || title.trim() === '') {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Title cannot be empty' });
    }

    const newTask: Task = { id: tasks.length + 1, title };
    tasks.push(newTask);
    res
      .status(HttpStatus.CREATED)
      .json({ message: `${eCrud.CREATE} ${JSON.stringify(newTask)}` });
  } catch (err) {
    console.error(err);
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: `${eStatusError.Error500}` });
  }
});

app.put('/tasks/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const taskId = parseInt(id, 10);

    if (!title || title.trim() === '') {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Title cannot be empty' });
    }

    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex !== -1) {
      tasks[taskIndex].title = title;
      return res.json({
        message: `${eCrud.UPDATED} ${JSON.stringify(tasks[taskIndex])}`,
      });
    }

    res.status(HttpStatus.NOT_FOUND).json({
      message: `${eStatusError.Error404}. Please check the provided ID.`,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: `${eStatusError.Error500}` });
  }
});

app.delete('/tasks/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const taskId = parseInt(id, 10);

    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex !== -1) {
      const deletedTask = tasks.splice(taskIndex, 1)[0];
      return res.json({
        message: `${eCrud.DELETED} ${JSON.stringify(deletedTask)}`,
      });
    }

    res.status(HttpStatus.NOT_FOUND).json({
      message: `${eStatusError.Error404}. Please check the provided ID.`,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: `${eStatusError.Error500}` });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running: ✔`);
});
