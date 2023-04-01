"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const index_js_1 = require("../utils/index.js");
const todoController_1 = __importDefault(require("../controllers/todoController"));
router.use(index_js_1.verifyToken);
router.get('/userTodos', todoController_1.default.getUserTodos);
// All routes below this middleware will be protected
router.get("/", (0, index_js_1.restrictTo)(["admin"]), todoController_1.default.getTodos);
// todo routes
router.post("/create", todoController_1.default.createTodo);
router.route("/:id").put(todoController_1.default.updateTodo).get(todoController_1.default.getTodo).delete(todoController_1.default.deleteTodo);
router.route("/view/:todoId").get(todoController_1.default.viewTodo);
exports.default = router;
//# sourceMappingURL=todos.js.map