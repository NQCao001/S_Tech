import { Request, Response } from "express";
export declare class UserController {
    private userService;
    constructor();
    login: (req: Request, res: Response) => Promise<void>;
    register: (req: Request, res: Response) => Promise<void>;
    changePassword: (req: Request, res: Response) => Promise<void>;
}
declare const _default: UserController;
export default _default;
