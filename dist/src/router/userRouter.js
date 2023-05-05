"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controller/user-controller"));
const auth_1 = require("../middleware/auth");
exports.userRouter = (0, express_1.default)();
exports.userRouter.post('/register', user_controller_1.default.register);
exports.userRouter.post('/login', user_controller_1.default.login);
exports.userRouter.use(auth_1.auth);
exports.userRouter.post('/change-password/:id', user_controller_1.default.changePassword);
//# sourceMappingURL=userRouter.js.map