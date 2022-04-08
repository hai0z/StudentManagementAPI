import { Request, Response } from "express";
import StudentAccount from "../entity/StudentAccount";
import TeacherAccount from "../entity/teacherAccount";
const loginController = {
    studentLogin: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { username, password } = req.body;
            const user = await StudentAccount.findOne({
                relations: ["account"],
                where: {
                    maHocSinh: username,
                    password: password,
                },
            });
            if (!user) {
                return res.json({ message: "Wrong username or password" });
            }
            return res.json({
                user: user.account,
                success: true,
            });
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    },
    teacherLogin: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { username, password } = req.body;
            const user = await TeacherAccount.findOne({
                relations: ["account"],
                where: {
                    maGiaoVien: username,
                    password: password,
                },
            });
            if (!user) {
                return res.json({ message: "Wrong username or password" });
            }
            return res.json({
                user: user.account,
                success: true,
            });
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    },
};

export default loginController;
