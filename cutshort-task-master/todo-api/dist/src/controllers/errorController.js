"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("../utils/appError"));
const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new appError_1.default(message, 400);
};
const handleDuplicateFieldsDB = (err) => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate field value: ${value}. Please use another value.`;
    return new appError_1.default(message, 400);
};
const handleValidationErrorDB = (err) => {
    const message = Object.values(err.errors).map((val) => val.message);
    return new appError_1.default(message.join('. '), 400);
};
const handleJWTerror = () => new appError_1.default('invalid token pls login again', 401);
const handleJWTExpiredError = () => new appError_1.default('jwt has expired', 401);
const sendErrorDev = (err, req, res) => {
    // API
    if (err.isOperational) {
        if (req.originalUrl.startsWith('/api')) {
            res.status(err.statusCode).json({
                error: err,
                status: err.status,
                stack_err: err.stack,
                message: err.message,
            });
        }
        else {
            console.log(err);
            res.status(err.statusCode).json({
                title: 'Something went wrong',
                msg: err.message,
            });
        }
    }
    else {
        console.log(err);
        res.status(err.statusCode).json({
            title: 'Something went wrong',
            msg: err.message,
        });
    }
};
const sendErrorProd = (err, req, res) => {
    // API
    if (err.isOperational) {
        if (req.originalUrl.startsWith('/api')) {
            res.status(err.statusCode).json({
                error: err,
                status: err.status,
                stack_err: err.stack,
                message: err.message,
            });
        }
        else {
            return res.status(err.statusCode).json({
                title: 'Something went wrong',
                msg: err.message,
            });
        }
    }
    else {
        return res.status(err.statusCode).json({
            title: 'Something went wrong',
            msg: 'Please try Again later',
        });
    }
};
const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, req, res);
    }
    else if (process.env.NODE_ENV === 'production') {
        let error = err;
        if (error.name === 'CastError')
            error = handleCastErrorDB(error);
        if (error.code === 11000)
            error = handleDuplicateFieldsDB(error);
        if (error.name === 'ValidationError')
            error = handleValidationErrorDB(error);
        if (error.name === 'JsonWebTokenError')
            error = handleJWTerror();
        if (error.name === 'TokenExpiredError')
            error = handleJWTExpiredError();
        sendErrorProd(error, req, res);
    }
    next();
};
exports.default = errorHandler;
//# sourceMappingURL=errorController.js.map