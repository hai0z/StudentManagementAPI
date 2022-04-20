import { Request, Response } from "express";
import Grade from "../entity/grade";
const gradeController = {
    getAll: async (_: Request, res: Response) => {
        try {
            const grade = await Grade.find();
            res.json(grade);
        } catch (err: any) {
            res.json({ message: err.message });
        }
    },
};
export default gradeController;
