# cutshort-task-master
#Todo Api

This is a simple Todo API built with TypeScript and Express.js. It allows you to manage a list of tasks by creating, reading, updating and deleting them.

Installation
To get started, you need to install the dependencies using Yarn. Run the following command in your terminal to install the required packages:

type "yarn" in your terminal

Usage
To start the server, run the following command:

type "yarn dev" in your terminal

Test
To run the tests, run the following command:
type "yarn test" in your terminal

This will start the server in development mode with Nodemon which will automatically restart the server when changes are made to the code.

The server will start on http://localhost:3000 by default, and you can use Postman or any other REST client to test the API endpoints.

API Endpoints
The following API endpoints are available:

GET /api/todos
Returns a list of all the tasks.

GET /api/todos/:id
Returns a specific task by ID.

POST /api/todos/create
Creates a new task with the given data.

PUT /api/todos/:id
Updates a specific task by ID with the given data.

DELETE /api/todos/:id
Deletes a specific task by ID.

Contributing
If you find a bug or want to contribute to the project, feel free to open an issue or submit a pull request. Any contributions are welcome!

License
This project is licensed under the MIT License.


