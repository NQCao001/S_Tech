import router from "express";
import userController from "../controller/user-controller";
import {auth} from "../middleware/auth";

export const userRouter = router();

userRouter.post('/register',userController.register);
userRouter.post('/login',userController.login);
userRouter.use(auth);
userRouter.post('/change-password/:id',userController.changePassword);
