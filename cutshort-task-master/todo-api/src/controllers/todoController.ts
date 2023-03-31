import { Response } from 'express';
import Todo from '../models/todo'
import { catchAsync } from '../utils';
import AppError from '../utils/appError';
import { AuthenticatedRequest} from '../interfaces';


const getTodos = catchAsync(async (req: AuthenticatedRequest, res: Response, next) => { 
    const todos = await Todo.find().sort("-createdAt")
    res.status(200).json({ todos });
});

const getUserTodos = catchAsync(async (req: AuthenticatedRequest, res: Response, next) => { 
    const  id  = req.user._id;
    const todos = await Todo.find({ user: id }).sort("-createdAt");
    res.status(200).json({ todos });
});


const createTodo = catchAsync(async (req: AuthenticatedRequest, res: Response, next) => { 
    const { title, description, completed } = req.body;
    
    if (!title || !description) next(new AppError('Please add all the fields', 422));

    const todo = new Todo({
        title,
        description,
        completed,
        user: req.user._id
    });

    await todo.save();
    res.status(201).json({ todo });

});

const getTodo = catchAsync(async (req: AuthenticatedRequest, res: Response, next) => { 
    const { id } = req.params;

    const todo = await Todo.findById(id);
    if (!todo) next(new AppError('No todo found', 404));

    res.status(200).json({ todo });
});


const updateTodo = catchAsync(async (req: AuthenticatedRequest, res: Response, next) => { 
    const { title, description, completed } = req.body;
    const { id } = req.params;

    if (!title || !description) next(new AppError('Please add all the fields', 422));

    const todo = await Todo.findByIdAndUpdate(id, {
        title,
        description,
        completed,
        user: req.user._id
    }, { new: true });

    if (!todo) next(new AppError('No todo found', 404));

    res.status(200).json({ todo });
});

const viewTodo = catchAsync(async (req: AuthenticatedRequest, res: Response, next) => { 
    const { todoId } = req.params
    
    // check if todo still exists
    const todo = await Todo.findById(todoId);
    if (!todo) next(new AppError('No todo found', 404));

    res.status(200).json({ todo });
});


const deleteTodo = catchAsync(async (req: AuthenticatedRequest, res: Response, next) => {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
        next(new AppError('No todo found', 404))
    } else {
        res.status(200).json({ 
            message: "Todo deleted successfully",
        });
    }
});


export default { getTodos, getUserTodos, createTodo, getTodo, updateTodo, deleteTodo, viewTodo };