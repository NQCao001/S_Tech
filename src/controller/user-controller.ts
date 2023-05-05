import {Request, Response} from "express";
import {UserService} from "../service/user-service";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    login = async (req: Request, res: Response) => {
        try {
            let user = await this.userService.checkLogin(req.body);
            if (user.check) {
                res.json({
                    user,
                    mess: 'Đăng nhập thành công'
                })
            } else {
                res.json({
                    mess: 'Sai tên tài khoản hoặc mật khẩu',
                })
            }
        } catch (e) {
            res.json({
                mess: e.message
            })
        }
    }
    register = async (req: Request, res: Response) => {
        try {
            let checkRegister = await this.userService.checkRegister(req.body);
            if (checkRegister) {
                res.json({
                    mess: "Tài khoản đã tồn tại"
                })
            } else {
                await this.userService.createUser(req.body);
                res.json({
                    mess: "Tạo tài khoản thành công"
                })
            }
        } catch (e) {
            res.json({
                mess: e.message
            })
        }
    }

    changePassword = async (req: Request, res: Response) => {
        try {
            let user = await this.userService.checkChangePassword(req.params.id, req.body.oldPassword, req.body.newPassword)
            if (!user.check) {
                res.json({
                    user,
                    mess: "Old Password Is Not Correct"
                })
            } else {
                res.json({
                    user,
                    mess: "Change Password Successfully"
                })
            }
        } catch (e) {
            res.json({
                mess: e.message
            })
        }
    }
}

export default new UserController();