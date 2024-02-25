import bodyParser = require('body-parser');
import cors = require('cors');
import { Application, Request, Response } from 'express';
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
  res.json(tasks);
});

app.post('/tasks', (req: Request, res: Response) => {
  const { title } = req.body;
  const newTask = { id: tasks.length + 1, title };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put('/tasks/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;

  const searchTask = tasks.find((taref) => taref.id === parseInt(id, 10));

  if (searchTask) {
    searchTask.title = title;
    return res.json(searchTask);
  }
  res.status(404).json({ message: 'Erroou! Tarefa inexistente parceiro' });
});

app.delete('/tasks/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const searchId = tasks.findIndex(
    (taref) => taref.id === parseInt(id, 10),
  );

  if (searchId !== -1) {
    const [deleteId] = tasks.splice(searchId, 10);
    return res.json(deleteId);
  }
  res.status(404).json({
    message:
      'Erroou! Parece que vai precisar pesquisar a lista para ver os elementos',
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando: ✔️ `);
});
