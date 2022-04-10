import { Request, Response } from "express";
import StudentAccount from "../entity/StudentAccount";
import TeacherAccount from "../entity/teacherAccount";
import Admin from "../entity/admin";
const loginController = {
    studentLogin: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { studentId, password } = req.body;
            const user = await StudentAccount.findOne({
                relations: ["account"],
                where: {
                    maHocSinh: studentId,
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
    adminLogin: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { username, password } = req.body;
            const user = await Admin.findOne({
                where: {
                    username: username,
                    password: password,
                },
            });
            if (!user) {
                return res.json({ message: "Wrong username or password" });
            }
            return res.json({
                user: user,
                success: true,
            });
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    },
};

export default loginController;
