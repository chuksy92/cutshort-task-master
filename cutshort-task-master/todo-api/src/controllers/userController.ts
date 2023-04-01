import { Response, NextFunction} from 'express';
import { catchAsync } from '../utils'
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
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const users = await User.find().skip(startIndex).limit(limit);

    const totalPages = Math.ceil(await User.countDocuments() / limit);

    // Add pagination info to the response headers
    res.set('X-Total-Count', await User.countDocuments() as unknown as string);
    res.set('X-Page', page as unknown as string);
    res.set('X-Per-Page', limit as unknown as string);
    res.set('X-Total-Pages', totalPages as unknown as string);

    res.status(200).json({ users });
});


const updateUser = catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => { 
    const { id } = req.params;
    const { name, email, password } = req.body;

    if (!name || !email || !password) next(new AppError('Please add all the fields', 422));

    const updatedUser = await User.findByIdAndUpdate(id, {
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