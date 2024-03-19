# Api To-Do List

This project was aimed more at applying basic concepts that can guide you or even give you a 'north' where you could start. I would also like to thank [@Yago](https://github.com/YagoCrispim) for challenging me to achieve this goal, making it possible for me to apply these concepts in the best way possible.

## Features

- Create Tasks
- Update existing Tasks by ID
- Get all Tasks's
- Get Tasks by ID
- Delete Tasks by ID

## Frameworks

[Express](https://expressjs.com/)

[Jest](https://jestjs.io/docs/getting-started)

## API Reference

#### READ all tasks

- GET /tarefas

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

<br>

```bash
curl http://localhost:3000/tasks
```

#### READ task

- GET /tarefas/{ID}

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of item to fetch |

<br>

```bash
curl http://localhost:3000/tasks/{id}
```

#### CREATE task

- POST /tarefas

| Parameter | Type     | Description                                   |
| :-------- | :------- | :-------------------------------------------- |
| `titulo`  | `string` | **Required**. title of the item to be created |

<br>

```bash
curl -X POST -H "Content-Type: application/json" -d '{"title": "Nova Tarefa"}' http://localhost:3000/tasks
```

#### UPDATE task

- PUT /tarefas/{ID}

| Parameter | Type     | Description                                    |
| :-------- | :------- | :--------------------------------------------- |
| `id`      | `number` | **Required**. Id of item to fetch              |
| `title`   | `number` | **Required**. tTitle of the item to be updated |

<br>

```bash
curl -X PUT -H "Content-Type: application/json" -d '{"title": "Novo Título"}' http://localhost:3000/tasks/{id}
```

#### DELETE task

- DELETE /tarefas/{ID}

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `number` | **Required**. Id of item to delete |

```bash
curl -X DELETE http://localhost:3000/tasks/{id}
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/MIKEMARQUEZINI/API_ToDo.git
```

Go to the project directory

```bash
  cd API_ToDo
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
   npx tsc && node dist/app.js
```
