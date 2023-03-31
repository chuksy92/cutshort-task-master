import { Request } from 'express';
import { Schema } from 'mongoose';




export interface AuthenticatedRequest extends Request {
  user: {
    _id: string;
    // Add more properties as needed
  }
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface ITodo {
  user: Schema.Types.ObjectId,
  title: string;
  description: string;
  completed: boolean;
}

export interface IPost {
  user: Schema.Types.ObjectId,
  todo: Schema.Types.ObjectId,
  content: string;
  comments: [ String ];
}

