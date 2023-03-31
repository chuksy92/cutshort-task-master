/** @format */

import { Schema, model } from 'mongoose';
import { IPost } from '../interfaces';

const postSchema = new Schema<IPost>({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},

	todo: {
		type: Schema.Types.ObjectId,
		ref: 'Todo',
	},
	content: {
		type: String,
		required: true,
	},
	comments: [{ type: String }],
});

export default model('Post', postSchema);

