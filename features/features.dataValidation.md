## Features  - 26/02/2024

✨  Retrieve a Single Task by ID (GET Endpoint):


`Description`: Allow users to retrieve a specific task by providing its ID.<br>
`Endpoint`: GET /tasks/{ID}<br>
`Behavior`: Returns only the specified task, not the entire task list.


✨ Create Task with Empty Request Body (POST Endpoint):

`Description`: Investigate and address the issue where creating a task with an empty request body results in the task being saved in the list.<br>
`Endpoint`: POST /tasks/{ID}<br>
`Issue`: Task is saved even when the request body is empty.

✨  Update Task with Empty Request Body (PUT Endpoint):

`Description`: Investigate and address the issue where updating a task with an empty request body results in the task   being updated in the list.<br>
`Endpoint`: PUT /tasks/{ID}<br>
`Issue`: Task is updated even when the request body is empty.

✨  Delete Only the Specified Task by ID (DELETE Endpoint):

`Description`: Ensure that deleting a task by its ID removes only that specific task, not others in the list.<br>
`Endpoint`: DELETE /tasks/{ID}<br>
`Issue`: Current behavior deletes tasks beyond the specified one.