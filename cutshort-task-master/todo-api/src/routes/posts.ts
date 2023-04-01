const express = require("express");
const router = express.Router();
import { verifyToken, restrictTo } from '../utils/index.js';

import postController from '../controllers/postController';


router.use(verifyToken);

// All routes below this middleware will be protected
router.route("/").get(restrictTo(["admin"]), postController.getPosts);

// post routes
router.get("/userPosts", postController.getUserPosts);
router.route("/create").post(postController.createPost);
router.route("/:id").put(postController.updatePost).get(postController.getPost).delete(postController.deletePost);
router.route("/comment/:postId").post(postController.createComment);



export default router;
