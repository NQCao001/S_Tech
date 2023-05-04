import {AppDataSource} from "../data-source";
import {User} from "../model/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import {SECRET} from "../middleware/auth";


export class UserService {
    private userRepository: any;

    constructor() {
        AppDataSource.initialize().then(connection => {
            this.userRepository = AppDataSource.getRepository(User);
        })
    }

    checkLogin = async (userLogin) => {
        let user = {
            check: false,
            token: '',
            userFind: []
        }
        let userFind = await this.userRepository.findBy({username: userLogin.username})

        if (userFind.length === 0) {
            user.check = false;
        } else {
            let compare = await bcrypt.compare(userLogin.password, userFind[0].password)
            if (!compare) {
                user.check = false;
            }
            if (compare) {
                let payload = {username: userFind[0].username}
                let token = await jwt.sign(payload, SECRET, {
                    expiresIn: 36000
                })
                user.token = token;
                user.check = true;
                user.userFind = userFind
            }
        }
        return user;
    }

    checkRegister = async (userRegister) => {
        let userFind = await this.userRepository.findBy({username: userRegister.username})
        let check;

        if (userFind.length !== 0) {
            check = true
        } else {
            userRegister.password = await bcrypt.hash(userRegister.password, 10)
            check = false
        }
        return check
    }

    createUser = async (user) => {
        let newUser = await this.userRepository.save(user)
        return newUser
    }

    checkChangePassword = async (idUser, oldPassword, newPassword) => {
        let user = {
            check: false,
            userFind: []
        }

        let userFind = await this.userRepository.findBy({id: idUser})
        if (userFind.length === 0) {
            user.check = false;
        } else {
            let compare = await bcrypt.compare(oldPassword, userFind[0].password)
            if (!compare) {
                user.userFind = userFind
                user.check = false;
            }
            if (compare) {
                newPassword = await bcrypt.hash(newPassword, 10)
                await this.userRepository.update({id: idUser}, {password: newPassword})
                user.check = true;
                user.userFind = userFind
            }
        }
        return user
    }
}