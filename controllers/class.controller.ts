import Class from "../entity/Class";
import { Request, Response } from "express";

const classController = {
    getAllClass: async (_: Request, res: Response) => {
        try {
            const classes = await Class.find();
            return res.json(classes);
        } catch (error) {
            return res.json({ message: error });
        }
    },
    getClassById: async (req: Request, res: Response) => {
        const { classId } = req.params;
        try {
            const class_ = await Class.findOne(classId);
            return res.json(class_);
        } catch (error) {
            return res.json({ message: error });
        }
    },
    getStudentByClass: async (req: Request, res: Response) => {
        const { classId } = req.params;
        try {
            const class_ = await Class.findOne(classId, {
                relations: ["students", "grade"],
            });
            return res.json(class_);
        } catch (error) {
            return res.json({ message: error });
        }
    },
    createClass: async (req: Request, res: Response) => {
        const { maLop, tenLop, gvcn, grade, nienKhoa } = req.body;
        try {
            const class_ = new Class();
            class_.maLop = maLop;
            class_.tenLop = tenLop;
            class_.gvcn = gvcn;
            class_.grade = grade;
            class_.nienKhoa = nienKhoa;
            await class_.save();
            return res.json({ message: "Create class successfully" });
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    },
};
export default classController;
