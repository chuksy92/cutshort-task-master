import { Request, Response } from 'express';
import Post from '../models/posts';
import { catchAsync } from '../utils';
import AppError from '../utils/appError';
import { AuthenticatedRequest} from '../interfaces';



const createPost = catchAsync(async (req: AuthenticatedRequest, res: Response, next) => { 
    const { title, content } = req.body;
    
    if (!title || !content) next(new AppError('Please add all the fields', 422));

    const post = new Post({
        title,
        content,
        user: req.user._id
        
        
    });

    await post.save();
    res.status(201).json({ post });

})



const getPosts = catchAsync(async (req: AuthenticatedRequest, res: Response, next) => { 
    const page = parseInt(req.query.page as string) || 1; // default to first page
    const limit = parseInt(req.query.limit as string) || 10; // default to 10 posts per page

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const posts = await Post.find().skip(startIndex).limit(limit);

    const totalPages = Math.ceil(await Post.countDocuments() / limit);

    // Add pagination info to the response headers
    res.set('X-Total-Count', await Post.countDocuments() as unknown as string);
    res.set('X-Page', page as unknown as string);
    res.set('X-Per-Page', limit as unknown as string);
    res.set('X-Total-Pages', totalPages as unknown as string);

    res.status(200).json({ posts });
});




const getUserPosts = catchAsync(async (req: AuthenticatedRequest, res: Response, next) => { 
    const id = req.user._id;
    const page = parseInt(req.query.page as string) || 1; // default to first page
    const limit = parseInt(req.query.limit as string) || 10; // default to 10 posts per page

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const posts = await Post.find({ user: id }).sort("-createdAt").skip(startIndex).limit(limit);

    const totalPages = Math.ceil(await Post.countDocuments({ user: id }) / limit);

    // Add pagination info to the response headers
    res.set('X-Total-Count', await Post.countDocuments({ user: id }) as unknown as string);
    res.set('X-Page', page as unknown as string);
    res.set('X-Per-Page', limit as unknown as string);
    res.set('X-Total-Pages', totalPages as unknown as string);

    res.status(200).json({ posts });
});


const getPost = catchAsync(async (req: Request, res: Response, next) => { 
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
        next(new AppError('No post found', 404))
    } else {
        res.status(200).json({ post });

    }
})

const updatePost = catchAsync(async (req: AuthenticatedRequest, res: Response, next) => { 
    const { title, content } = req.body;
    const { id } = req.params;
    if (!title || !content) next(new AppError('Please add all the fields', 422));

    const post = await Post.findByIdAndUpdate(id, {
        title,
        content,
        user: req.user._id
    }, { new: true });

    if (!post) {
        next(new AppError('No post found', 404))
    } else {
        
        res.status(200).json({ post });
    }

})

const deletePost = catchAsync(async (req: Request, res: Response, next) => { 
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);
    console.log(post)
    if (!post) {
        next(new AppError('No post found', 404))
    } else {
        res.status(200).json({ 
            message: 'Post deleted successfully'
        });
    }
    
})

const createComment = catchAsync(async (req: AuthenticatedRequest, res: Response, next) => { 
    const { postId } = req.params;
    const { comment } = req.body;

    // check if post still exists
    const post = await Post.findById(postId);
    if (!post) next(new AppError('Post not found, This post might have been deleted or does not exist', 404));

    const newComment = await Post.findByIdAndUpdate(postId, {
        $push: { comments: comment }
    }, { new: true });

    res.status(200).json({ newComment });
})



export default {
    createPost,
    getPosts,
    getUserPosts,
    getPost,
    updatePost,
    deletePost,
    createComment
}