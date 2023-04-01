"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const index_js_1 = require("../utils/index.js");
const postController_1 = __importDefault(require("../controllers/postController"));
router.use(index_js_1.verifyToken);
// All routes below this middleware will be protected
router.route("/").get((0, index_js_1.restrictTo)(["admin"]), postController_1.default.getPosts);
// post routes
router.get("/userPosts", postController_1.default.getUserPosts);
router.route("/create").post(postController_1.default.createPost);
router.route("/:id").put(postController_1.default.updatePost).get(postController_1.default.getPost).delete(postController_1.default.deletePost);
router.route("/comment/:postId").post(postController_1.default.createComment);
exports.default = router;
//# sourceMappingURL=posts.js.map