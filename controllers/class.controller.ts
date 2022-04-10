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
                relations: ["students"],
            });
            return res.json(class_);
        } catch (error) {
            return res.json({ message: error });
        }
    },
    createClass: async (req: Request, res: Response) => {
        const { maLop, tenLop, gvcn, grade, nienKhoa, student } = req.body;
        try {
            const class_ = new Class();
            class_.maLop = maLop;
            class_.tenLop = tenLop;
            class_.gvcn = gvcn;
            class_.grade = grade;
            class_.nienKhoa = nienKhoa;
            class_.students = student;
            //check if class exists
            const classExists = await Class.findOne({
                where: {
                    maLop,
                },
            });
            if (classExists) {
                return res.status(500).json({ message: "class exists" });
            }
            await class_.save();
            return res
                .status(201)
                .json({ message: "Create class successfully", class_ });
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    },
};
export default classController;
