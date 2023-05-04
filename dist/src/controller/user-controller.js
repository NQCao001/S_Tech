"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../service/user-service");
class UserController {
    constructor() {
        this.login = async (req, res) => {
            try {
                let user = await this.userService.checkLogin(req.body);
                if (user.check) {
                    res.json({
                        user,
                        mess: 'Đăng nhập thành công'
                    });
                }
                else {
                    res.json({
                        mess: 'Sai tên tài khoản hoặc mật khẩu',
                    });
                }
            }
            catch (e) {
                res.json({
                    mess: e.message
                });
            }
        };
        this.loginWithFb = async (req, res) => {
            try {
                let newUser = await this.userService.createUser(req.body);
                let user = { check: true, authenticUser: [] };
                user.authenticUser.push(newUser);
                await res.json({ user: user });
            }
            catch (e) {
                console.log(e.message);
            }
        };
        this.register = async (req, res) => {
            try {
                let checkRegister = await this.userService.checkRegister(req.body);
                if (checkRegister) {
                    res.json({
                        mess: "Tài khoản đã tồn tại"
                    });
                }
                else {
                    await this.userService.createUser(req.body);
                    res.json({
                        mess: "Tạo tài khoản thành công"
                    });
                }
            }
            catch (e) {
                res.json({
                    mess: e.message
                });
            }
        };
        this.changePassword = async (req, res) => {
            try {
                let user = await this.userService.checkChangePassword(req.params.id, req.body.oldPassword, req.body.newPassword);
                if (!user.check) {
                    res.json({
                        user,
                        mess: "Old Password Is Not Correct"
                    });
                }
                else {
                    res.json({
                        user,
                        mess: "Change Password Successfully"
                    });
                }
            }
            catch (e) {
                res.json({
                    mess: e.message
                });
            }
        };
        this.userService = new user_service_1.UserService();
    }
}
exports.UserController = UserController;
exports.default = new UserController();
//# sourceMappingURL=user-controller.js.map