"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    todo: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Todo',
    },
    content: {
        type: String,
        required: true,
    },
    comments: [{ type: String }],
});
exports.default = (0, mongoose_1.model)('Post', postSchema);
//# sourceMappingURL=posts.js.map