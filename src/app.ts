import bodyParser = require('body-parser');
import cors = require('cors');
import { Application, Request, Response } from 'express';
import express = require('express');

const app: Application = express();
const PORT = 3000;

app.use(bodyParser.json());
// Por que está usando CORS? Pra que ele serve?
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
      return res.status(404).json({ message: 'ID Not Found! Try again' });
    }
    return res.status(200).json(task);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
  /*
    Aqui quero apenas uma task, não a lista inteira.
    */
});

app.post('/tasks', (req: Request, res: Response) => {
  try {
    const { title } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ message: 'Title cannot be empty' });
    }

    const newTask = { id: tasks.length + 1, title };
    tasks.push(newTask);
    res.status(201).json(newTask);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
  /*
    Estou fazendo a request enviando o body vazio e mesmo assim
    a task é salva na lista. Por que salvar um ToDo vazio?
*/
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
      return res.json(searchTask);
    }
    res
      .status(404)
      .json({ message: 'Task not found. Please check the provided ID.' });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
  /*
    Estou fazendo a request enviando o body vazio e mesmo assim
    a task é atualizada na lista. Por que salvar um ToDo vazio?
*/
});

app.delete('/tasks/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const searchId = tasks.findIndex((taref) => taref.id === parseInt(id, 10));

    if (searchId !== -1) {
      const [deleteId] = tasks.splice(searchId, 1);
      return res.json(deleteId);
    }
    res.status(404).json({
      message: 'Error! Task not found. Please check the provided ID.',
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }

  /*
    Se eu tiver uma lista com 10 task e pedir para deletar a task 02
    a aplicação irá deletar as tasks: 2,3,4,5,6,7,8,9,10, ao invés de só
    a task 02

*/
});

app.listen(PORT, () => {
  console.log(`Server is runing: ✔ `);
});
