import { Request, Response } from "express";
import StudentAccount from "../entity/StudentAccount";
import TeacherAccount from "../entity/teacherAccount";

const adminController = {
    getAllStudentAccount: async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        try {
            const studentAccount = await StudentAccount.find();
            return res.json(studentAccount);
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    },
    getAllTeacherAccount: async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        try {
            const teacherAccount = await TeacherAccount.find();
            return res.json(teacherAccount);
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    },
    updateStudentAccount: async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        const { id } = req.params;
        const studentAccount = await StudentAccount.findOne({
            where: {
                maHocSinh: id,
            },
        });
        if (!studentAccount) {
            return res
                .status(404)
                .json({ message: "Student Account not found" });
        }
        const { password, ...other } = req.body;
        studentAccount.password = password;
        await studentAccount.save();
        return res.json({ ...other, studentAccount });
    },
    updateTeacherAccount: async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        const { id } = req.params;
        const teacherAccount = await TeacherAccount.findOne({
            where: {
                maGiaoVien: id,
            },
        });
        if (!teacherAccount) {
            return res
                .status(404)
                .json({ message: "Teacher Account not found" });
        }
        const { password, ...other } = req.body;
        teacherAccount.password = password;
        await teacherAccount.save();
        return res.json({ ...other, teacherAccount });
    },
};

export default adminController;
