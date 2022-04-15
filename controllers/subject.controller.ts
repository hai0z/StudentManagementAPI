import { Request, Response } from "express";
import Subject from "../entity/Subject";
const subjectController = {
    getAll: async (req: Request, res: Response): Promise<Response> => {
        try {
            const subject = await Subject.find();
            return res.json(subject);
        } catch (error) {
            return res.json({ message: error });
        }
    },
    getById: async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;
        try {
            const subject = await Subject.findOne(id);
            if (!subject) {
                return res.status(404).json({ message: "Subject not found" });
            }
            return res.json(subject);
        } catch (error) {
            return res.json({ message: error });
        }
    },
    update: async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;
        const { maMonHoc, tenMonHoc } = req.body;
        try {
            const subject = await Subject.findOne(id);
            if (!subject) {
                return res.status(404).json({ message: "Subject not found" });
            }
            subject.maMonHoc = maMonHoc;
            subject.tenMonHoc = tenMonHoc;
            await subject.save();
            return res.status(200).json(subject);
        } catch (error) {
            return res.json({ message: error });
        }
    },
    delete: async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;
        try {
            const subject = await Subject.findOne(id);
            if (!subject) {
                return res.status(404).json({ message: "Subject not found" });
            }
            await subject.remove();
            return res.json({ message: "Subject deleted" });
        } catch (error) {
            return res.json({ message: error });
        }
    },
};

export default subjectController;
