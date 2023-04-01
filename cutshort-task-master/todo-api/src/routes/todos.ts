const express = require("express");
const router = express.Router();
import { verifyToken, restrictTo } from '../utils/index.js';
import todoController from '../controllers/todoController';

router.use(verifyToken);
router.get('/userTodos', todoController.getUserTodos);

// All routes below this middleware will be protected
router.get("/", restrictTo(["admin"]), todoController.getTodos);

// todo routes
router.post("/create", todoController.createTodo);
router.route("/:id").put(todoController.updateTodo).get(todoController.getTodo).delete(todoController.deleteTodo);
router.route("/view/:todoId").get(todoController.viewTodo);



export default router;