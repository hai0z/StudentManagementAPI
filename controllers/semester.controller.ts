import { Request, Response } from "express";
import Semester from "../entity/Semester";
const semesterController = {
    getAllSemester: async (_: Request, res: Response): Promise<Response> => {
        try {
            const semesters = await Semester.find();
            return res.json(semesters);
        } catch (error) {
            return res.json({ message: error });
        }
    },
    getSemesterById: async (req: Request, res: Response): Promise<Response> => {
        try {
            const semester = await Semester.findOne(req.params.semesterId);
            //check if semester exist
            if (!semester) {
                return res.status(404).json({ message: "Semester not found" });
            }
            return res.json(semester);
        } catch (error) {
            return res.json({ message: error });
        }
    },
    createSemester: async (req: Request, res: Response): Promise<Response> => {
        const { maHocKi, namHoc, hocKi } = req.body;
        try {
            const semester = Semester.create({
                maHocKi,
                namHoc,
                hocKi,
            });
            //check if semester exist
            const checkSemester = await Semester.findOne({
                where: {
                    maHocKi,
                },
            });
            if (checkSemester) {
                return res.json({ message: "Semester already exist" });
            }
            await semester.save();
            return res.json(semester);
        } catch (error) {
            return res.json({ message: error });
        }
    },
    deleteSemester: async (req: Request, res: Response): Promise<Response> => {
        try {
            const semester = await Semester.findOne(req.params.semesterId);
            //check if semester exist
            if (!semester) {
                return res.status(404).json({ message: "Semester not found" });
            }
            await semester.remove();
            return res.json({ message: "Semester deleted" });
        } catch (error) {
            return res.json({ message: error });
        }
    },
};
export default semesterController;
