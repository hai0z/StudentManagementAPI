import Teacher from "../entity/Teacher";
import { Request, Response } from "express";
import Class from "../entity/Class";
const teacherController = {
    getAllTeacher: async (_: Request, res: Response): Promise<Response> => {
        try {
            const teachers = await Teacher.find();
            return res.json(teachers);
        } catch (error) {
            return res.json({ message: error });
        }
    },
    getClassByTeacher: async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        const { teacherId } = req.params;
        try {
            const teacher = await Teacher.findOne(teacherId, {
                relations: ["maLop", "subjects"],
            });
            return res.json({ teacher });
        } catch (error) {
            return res.json({ message: error });
        }
    },
};
export default teacherController;
