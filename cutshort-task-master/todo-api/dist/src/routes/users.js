"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
const router = express.Router();
const userController_1 = __importDefault(require("../controllers/userController"));
const utils_1 = require("../utils");
router.use(utils_1.verifyToken);
/* GET users listing. */
router.get('/allUsers', userController_1.default.getUsers);
router.post('/create', userController_1.default.createUser);
// All routes below this middleware will be protected
router
    .get('/:userId', userController_1.default.getUser)
    .put((0, utils_1.restrictTo)(['admin']), userController_1.default.updateUser)
    .delete((0, utils_1.restrictTo)(['admin']), userController_1.default.deleteUser);
exports.default = router;
//# sourceMappingURL=users.js.map