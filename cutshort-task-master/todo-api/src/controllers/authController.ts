import bcrypt from 'bcrypt';
import User from '../models/users';
import _ from 'lodash';
import { Request, Response, NextFunction } from 'express';
import { catchAsync, generateToken } from '../utils';
import AppError from '../utils/appError';



const login = catchAsync(async (req: Request, res: Response, next) => {
	if (_.isEmpty(req.body)) return next(new AppError('Empty request body', 500));
    let user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send('Invalid email or password');

	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword) return res.status(400).send('Invalid email or password');

	const token = generateToken(user);
	res.status(200).json({ token: token });
});

const register = catchAsync(async (req: Request, res: Response, next) => { 
    if (_.isEmpty(req.body)) return res.status(500).send('Empty request body');

	const salt = await bcrypt.genSalt(10);
	req.body.password = await bcrypt.hash(req.body.password, salt);

	let user = new User(req.body);
	await user.save();

	const token = generateToken(user);
    
    res.status(200).json({
        token: token,
        user: _.pick(user, ['id', 'name', 'email'])
    });
});

export default {
    login,
    register
};