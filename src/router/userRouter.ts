import router from "express";
import userController from "../controller/user-controller";

export const userRouter = router();

userRouter.post('/register',userController.register);
userRouter.post('/login',userController.login);
userRouter.post('/change-password/:id',userController.changePassword);
