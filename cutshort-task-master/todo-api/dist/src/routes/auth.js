"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const authController_1 = __importDefault(require("../controllers/authController"));
router.route('/login').post(authController_1.default.login);
router.route('/register').post(authController_1.default.register);
exports.default = router;
//# sourceMappingURL=auth.js.map