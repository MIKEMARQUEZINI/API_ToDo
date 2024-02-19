import bodyParser = require('body-parser');
import cors = require('cors');
import { Application, Request, Response } from 'express';
import express = require('express');

const app: Application = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

let tarefas: { id: number; titulo: string }[] = [];

app.get('/tarefas', (req: Request, res: Response) => {
  res.json(tarefas);
});

app.get('/tarefas/:id', (req: Request, res: Response) => {
  res.json(tarefas);
});

app.post('/tarefas', (req: Request, res: Response) => {
  const { titulo } = req.body;
  const novaTarefa = { id: tarefas.length + 1, titulo };
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

app.put('/tarefas/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { titulo } = req.body;

  const procureTarefa = tarefas.find((taref) => taref.id === parseInt(id, 10));

  if (procureTarefa) {
    procureTarefa.titulo = titulo;
    return res.json(procureTarefa);
  }
  res.status(404).json({ message: 'Erroou! Tarefa inexistente parceiro' });
});

app.delete('/tarefas/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const pesquisarOID = tarefas.findIndex(
    (taref) => taref.id === parseInt(id, 10),
  );

  if (pesquisarOID !== -1) {
    const [deleteOId] = tarefas.splice(pesquisarOID, 10);
    return res.json(deleteOId);
  }
  res.status(404).json({
    message:
      'Erroou! Parece que vai precisar pesquisar a lista para ver os elementos',
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando: ✔️ `);
});
