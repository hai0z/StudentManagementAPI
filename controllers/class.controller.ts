import Class from "../entity/Class";
import { Request, Response } from "express";
import Teacher from "../entity/Teacher";
const classController = {
    getAllClass: async (_: Request, res: Response) => {
        try {
            const classes = await Class.find();
            return res.json(classes);
        } catch (error) {
            return res.json({ message: error });
        }
    },
    getStudentByClass: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const class_ = await Class.findOne(id, { relations: ["students"] });
            return res.json(class_);
        } catch (error) {
            return res.json({ message: error });
        }
    },
    getTeaherByClass: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const class_ = await Class.findOne(id, { relations: ["teacher"] });

            const allTeacher = await Teacher.find({ relations: ["subjects"] });

            const { teacher, ...other } = class_ as Class;

            const subjectsOfTeacher = allTeacher?.filter((subject) => {
                return class_?.teacher
                    ?.map((teacher) => teacher.maGiaoVien)
                    .includes(subject.maGiaoVien);
            });

            return res.json({ lop: other, teacher: subjectsOfTeacher });
        } catch (error) {
            return res.json({ message: error });
        }
    },
};
export default classController;
