"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const todo_1 = __importDefault(require("../models/todo"));
const utils_1 = require("../utils");
const appError_1 = __importDefault(require("../utils/appError"));
const getTodos = (0, utils_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1; // default to first page
    const limit = parseInt(req.query.limit) || 10; // default to 10 todos per page
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const todos = yield todo_1.default.find().sort("-createdAt").skip(startIndex).limit(limit);
    const totalPages = Math.ceil((yield todo_1.default.countDocuments()) / limit);
    // Add pagination info to the response headers
    res.set('X-Total-Count', yield todo_1.default.countDocuments());
    res.set('X-Page', page);
    res.set('X-Per-Page', limit);
    res.set('X-Total-Pages', totalPages);
    res.status(200).json({ todos });
}));
const getUserTodos = (0, utils_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user._id;
    const todos = yield todo_1.default.find({ user: id }).sort("-createdAt");
    res.status(200).json({ todos });
}));
const createTodo = (0, utils_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, completed } = req.body;
    if (!title || !description)
        next(new appError_1.default('Please add all the fields', 422));
    const todo = new todo_1.default({
        title,
        description,
        completed,
        user: req.user._id
    });
    yield todo.save();
    res.status(201).json({ todo });
}));
const getTodo = (0, utils_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const todo = yield todo_1.default.findById(id);
    if (!todo) {
        next(new appError_1.default('No todo found', 404));
    }
    else {
        res.status(200).json({ todo });
    }
}));
const updateTodo = (0, utils_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, completed } = req.body;
    const { id } = req.params;
    if (!title || !description)
        next(new appError_1.default('Please add all the fields', 422));
    const todo = yield todo_1.default.findByIdAndUpdate(id, {
        title,
        description,
        completed,
        user: req.user._id
    }, { new: true });
    if (!todo) {
        next(new appError_1.default('No todo found', 404));
    }
    else {
        res.status(200).json({ todo });
    }
}));
const viewTodo = (0, utils_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { todoId } = req.params;
    // check if todo still exists
    const todo = yield todo_1.default.findById(todoId);
    if (!todo) {
        next(new appError_1.default('No todo found', 404));
    }
    else {
        res.status(200).json({ todo });
    }
}));
const deleteTodo = (0, utils_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const todo = yield todo_1.default.findByIdAndDelete(id);
    if (!todo) {
        next(new appError_1.default('No todo found', 404));
    }
    else {
        res.status(200).json({
            message: "Todo deleted successfully",
        });
    }
}));
exports.default = { getTodos, getUserTodos, createTodo, getTodo, updateTodo, deleteTodo, viewTodo };
//# sourceMappingURL=todoController.js.map