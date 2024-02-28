import bodyParser = require('body-parser');
import cors = require('cors');
import { Application, Request, Response } from 'express';
import { eCrud, eStatusError } from './enum/status-enum';
import express = require('express');

const app: Application = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

let tasks: { id: number; title: string }[] = [];

app.get('/tasks', (req: Request, res: Response) => {
  res.json(tasks);
});

app.get('/tasks/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const task = tasks.find((t) => t.id === parseInt(id));

    if (!task) {
      return res
        .status(404)
        .json({ message: `ID ${eStatusError.Error404}! Try again ` });
    }
    return res
      .status(200)
      .json({ message: `${eCrud.READ} ${JSON.stringify(task)}` });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: `${eStatusError.Error500}` });
  }
});

app.post('/tasks', (req: Request, res: Response) => {
  try {
    const { title } = req.body;

    if (!title || title.trim() === '') {
      return res.status(404).json({ message: 'Title cannot be empty' });
    }

    const newTask = { id: tasks.length + 1, title };
    tasks.push(newTask);
    res
      .status(201)
      .json({ message: `${eCrud.CREATE} ${JSON.stringify(newTask)}` });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: `${eStatusError.Error500}` });
  }
});

app.put('/tasks/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ message: 'Title cannot be empty' });
    }

    const searchTask = tasks.find((taref) => taref.id === parseInt(id, 10));

    if (searchTask) {
      searchTask.title = title;
      return res.json({
        message: `${eCrud.UPDATED} ${JSON.stringify(searchTask)}`,
      });
    }
    res.status(404).json({
      message: `${eStatusError.Error404}. Please check the provided ID.`,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: `${eStatusError.Error500}` });
  }
});

app.delete('/tasks/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const searchId = tasks.findIndex((taref) => taref.id === parseInt(id, 10));

    if (searchId !== -1) {
      const [deleteId] = tasks.splice(searchId, 1);
      return res.json({
        message: `${eCrud.DELETED} ${JSON.stringify(deleteId)}`,
      });
    }
    res.status(404).json({
      message: `${eStatusError.Error404}. Please check the provided ID.`,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: `${eStatusError.Error500}` });
  }
});

app.listen(PORT, () => {
  console.log(`Server is runing: ✔ `);
});
