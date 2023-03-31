/** @format */

import { Schema, model } from 'mongoose';
import { ITodo } from '../interfaces';


const todoSchema = new Schema<ITodo>({
	user: {
		type: Schema.Types.ObjectId,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	completed: {
		type: Boolean,
		default: false,
	},
});

export default model('Todo', todoSchema);
