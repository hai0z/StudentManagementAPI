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
};
export default semesterController;
