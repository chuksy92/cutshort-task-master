import { Response, NextFunction} from 'express';
import { catchAsync } from '../utils';
import  User  from '../models/users'
import AppError from '../utils/appError';
import { AuthenticatedRequest } from '../interfaces';


const getUser = catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    // check if the user exists
    const user = await User.findById(userId);
    if (!user) {
        next(new AppError('No user found', 404))
    } else {
        res.status(200).json({
            user
        });
    }
});

const createUser = catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => { 
    const { name, email, password } = req.body;

    if (!name || !email || !password) next(new AppError('Please add all the fields', 422));

    const user = new User({
        name,
        email,
        password
    });

    await user.save();
    res.status(201).json({ user });
});
 

const getUsers = catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => { 
    const users = await User.find();
    res.status(200).json({ users });
});

const updateUser = catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => { 
    const { users } = req.params;
    const { name, email, password } = req.body;

    if (!name || !email || !password) next(new AppError('Please add all the fields', 422));

    const updatedUser = await User.findByIdAndUpdate(users, {
        name,
        email,
        password
    }, { new: true });

    res.status(200).json({ updatedUser });
});

const deleteUser = catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => { 
    const { userId } = req.params;

    // check if the user exists
    const user = await User.findOne({ userId: userId });
    if (!user) { 
        next(new AppError('No user found', 404));
    } else {
        await User.findByIdAndDelete(userId);

    }

});

export default {
    getUser,
    createUser,
    getUsers,
    updateUser,
    deleteUser
};