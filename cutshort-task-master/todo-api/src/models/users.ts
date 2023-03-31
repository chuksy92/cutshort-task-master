/** @format */

import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces';
import validator from 'validator';

const userSchema = new Schema<IUser>({
	name: {
		type: String,
		required: [true, 'Name is required'],
    	trim: true,
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
    	unique: true,
    	lowercase: true,
    	trim: true,
    	validate: [validator.isEmail, 'Please provide a valid email'],
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
    	minlength: [6, 'Password must be at least 6 characters'],
    	trim: true,
    	// select: false,
	},
	role: {
		type: String,
		enum: ['user', 'admin'],
		default: 'user',
	},
});


export default model('User', userSchema);
