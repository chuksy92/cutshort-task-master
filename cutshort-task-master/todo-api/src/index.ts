/// <reference path="./controllers/errorController.ts" />
const redis = require('redis');

// Create a Redis client
const client = redis.createClient();

const express = require("express");
const app = express();
import userRouter from "./routes/users";
import auth from "./routes/auth";
import postRouter from "./routes/posts";
import todoRouter from "./routes/todos";
import cors from 'cors'
import xss from 'xss-clean';
import hpp from 'hpp';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import bodyParser from "body-parser";
import AppError from './utils/appError';
import globalErrorHandler from './controllers/errorController';


app.use(cors());

// header security
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

// rate limiting
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

// Add the body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/todo", todoRouter);
app.use("/api/auth", auth);
app.use("/api/posts", postRouter);


// Global  Error handling middleware for all routes
// this will skip all the middlewares and go to the error handling middleware
app.all('*', (req, res, next) => {
  next(
    new AppError(
      `Route is invalid, please check the ${req.originalUrl} and try again.`,
      404
    )
  );
});


// Error handling middleware
app.use(globalErrorHandler);

export default app;
