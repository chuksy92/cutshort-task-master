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
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_1 = __importDefault(require("../models/users"));
const lodash_1 = __importDefault(require("lodash"));
const utils_1 = require("../utils");
const appError_1 = __importDefault(require("../utils/appError"));
const login = (0, utils_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (lodash_1.default.isEmpty(req.body))
        return next(new appError_1.default('Empty request body', 500));
    let user = yield users_1.default.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).send('Invalid email or password');
    const validPassword = yield bcrypt_1.default.compare(req.body.password, user.password);
    if (!validPassword)
        return res.status(400).send('Invalid email or password');
    const token = (0, utils_1.generateToken)(user);
    res.status(200).json({ token: token });
}));
const register = (0, utils_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (lodash_1.default.isEmpty(req.body))
        return res.status(500).send('Empty request body');
    const salt = yield bcrypt_1.default.genSalt(10);
    req.body.password = yield bcrypt_1.default.hash(req.body.password, salt);
    let user = new users_1.default(req.body);
    yield user.save();
    const token = (0, utils_1.generateToken)(user);
    res.status(200).json({
        token: token,
        user: lodash_1.default.pick(user, ['id', 'name', 'email'])
    });
}));
exports.default = {
    login,
    register
};
//# sourceMappingURL=authController.js.map