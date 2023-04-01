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
const posts_1 = __importDefault(require("../models/posts"));
const utils_1 = require("../utils");
const appError_1 = __importDefault(require("../utils/appError"));
const createPost = (0, utils_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = req.body;
    if (!title || !content)
        next(new appError_1.default('Please add all the fields', 422));
    const post = new posts_1.default({
        title,
        content,
        user: req.user._id
    });
    yield post.save();
    res.status(201).json({ post });
}));
const getPosts = (0, utils_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1; // default to first page
    const limit = parseInt(req.query.limit) || 10; // default to 10 posts per page
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const posts = yield posts_1.default.find().skip(startIndex).limit(limit);
    const totalPages = Math.ceil((yield posts_1.default.countDocuments()) / limit);
    // Add pagination info to the response headers
    res.set('X-Total-Count', yield posts_1.default.countDocuments());
    res.set('X-Page', page);
    res.set('X-Per-Page', limit);
    res.set('X-Total-Pages', totalPages);
    res.status(200).json({ posts });
}));
const getUserPosts = (0, utils_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user._id;
    const page = parseInt(req.query.page) || 1; // default to first page
    const limit = parseInt(req.query.limit) || 10; // default to 10 posts per page
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const posts = yield posts_1.default.find({ user: id }).sort("-createdAt").skip(startIndex).limit(limit);
    const totalPages = Math.ceil((yield posts_1.default.countDocuments({ user: id })) / limit);
    // Add pagination info to the response headers
    res.set('X-Total-Count', yield posts_1.default.countDocuments({ user: id }));
    res.set('X-Page', page);
    res.set('X-Per-Page', limit);
    res.set('X-Total-Pages', totalPages);
    res.status(200).json({ posts });
}));
const getPost = (0, utils_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const post = yield posts_1.default.findById(id);
    if (!post) {
        next(new appError_1.default('No post found', 404));
    }
    else {
        res.status(200).json({ post });
    }
}));
const updatePost = (0, utils_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = req.body;
    const { id } = req.params;
    if (!title || !content)
        next(new appError_1.default('Please add all the fields', 422));
    const post = yield posts_1.default.findByIdAndUpdate(id, {
        title,
        content,
        user: req.user._id
    }, { new: true });
    if (!post) {
        next(new appError_1.default('No post found', 404));
    }
    else {
        res.status(200).json({ post });
    }
}));
const deletePost = (0, utils_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const post = yield posts_1.default.findByIdAndDelete(id);
    console.log(post);
    if (!post) {
        next(new appError_1.default('No post found', 404));
    }
    else {
        res.status(200).json({
            message: 'Post deleted successfully'
        });
    }
}));
const createComment = (0, utils_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.params;
    const { comment } = req.body;
    // check if post still exists
    const post = yield posts_1.default.findById(postId);
    if (!post)
        next(new appError_1.default('Post not found, This post might have been deleted or does not exist', 404));
    const newComment = yield posts_1.default.findByIdAndUpdate(postId, {
        $push: { comments: comment }
    }, { new: true });
    res.status(200).json({ newComment });
}));
exports.default = {
    createPost,
    getPosts,
    getUserPosts,
    getPost,
    updatePost,
    deletePost,
    createComment
};
//# sourceMappingURL=postController.js.map