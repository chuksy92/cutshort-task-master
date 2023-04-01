"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const users_1 = __importDefault(require("../models/users"));
const appError_1 = __importDefault(require("../utils/appError"));
const getUser = (0, utils_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    // check if the user exists
    const user = yield users_1.default.findById(userId);
    if (!user) {
        next(new appError_1.default('No user found', 404));
    }
    else {
        res.status(200).json({
            user
        });
    }
}));
const createUser = (0, utils_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
        next(new appError_1.default('Please add all the fields', 422));
    const user = new users_1.default({
        name,
        email,
        password
    });
    yield user.save();
    res.status(201).json({ user });
}));
const getUsers = (0, utils_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const users = yield users_1.default.find().skip(startIndex).limit(limit);
    const totalPages = Math.ceil((yield users_1.default.countDocuments()) / limit);
    // Add pagination info to the response headers
    res.set('X-Total-Count', yield users_1.default.countDocuments());
    res.set('X-Page', page);
    res.set('X-Per-Page', limit);
    res.set('X-Total-Pages', totalPages);
    res.status(200).json({ users });
}));
const updateUser = (0, utils_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, email, password } = req.body;
    if (!name || !email || !password)
        next(new appError_1.default('Please add all the fields', 422));
    const updatedUser = yield users_1.default.findByIdAndUpdate(id, {
        name,
        email,
        password
    }, { new: true });
    res.status(200).json({ updatedUser });
}));
const deleteUser = (0, utils_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    // check if the user exists
    const user = yield users_1.default.findOne({ userId: userId });
    if (!user) {
        next(new appError_1.default('No user found', 404));
    }
    else {
        yield users_1.default.findByIdAndDelete(userId);
    }
}));
exports.default = {
    getUser,
    createUser,
    getUsers,
    updateUser,
    deleteUser
};
//# sourceMappingURL=userController.js.map