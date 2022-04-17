import { Request, Response } from "express";
import Mark from "../entity/Mark";
import Student from "../entity/Student";
const markController = {
    getAllMark: async (_: Request, res: Response) => {
        try {
            const marks = await Mark.find();
            return res.json(marks);
        } catch (error) {
            return res.json({ message: error });
        }
    },
    getSingleMark: async (req: Request, res: Response): Promise<Response> => {
        const { maDiem } = req.params;
        try {
            const mark = await Mark.findOne(maDiem);
            if (!mark) {
                return res.json({ message: "Mark not found" });
            }
            return res.json(mark);
        } catch (error) {
            return res.json({ message: error });
        }
    },
    getMark: async (req: Request, res: Response): Promise<Response> => {
        const { maLop, maMonHoc, maHocKi } = req.params;
        try {
            const mark = await Mark.find({
                where: {
                    student: { lop_maLop: maLop },
                    monHoc_maMonHoc: maMonHoc,
                    hocKi_maHocKi: maHocKi,
                },
                relations: ["student"],
            });
            return res.json(mark);
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    },
    createMark: async (req: Request, res: Response): Promise<Response> => {
        const { maHocKi, maMonHoc, id } = req.body;

        try {
            const student = await Student.findOne(id, { relations: ["marks"] });
            const mark = Mark.create({
                hocKi_maHocKi: maHocKi,
                monHoc_maMonHoc: maMonHoc,
            });
            student?.marks.push(mark);
            await student?.save();
            return res.json(student);
        } catch (error) {
            return res.json({ message: error });
        }
    },
    updateMark: async (req: Request, res: Response): Promise<Response> => {
        try {
            const {
                maDiem,
                diemHeSo1,
                diemHeSo1_2,
                diemHeSo1_3,
                diemHeSo1_4,
                diemHeSo2,
                diemHeSo2_2,
                diemHeSo2_3,
                diemHeSo3,
            } = req.body;
            const mark = await Mark.findOne(maDiem);
            if (mark) {
                const newMark = new Mark();
                newMark.maDiem = mark.maDiem;
                newMark.diemHeSo1 = diemHeSo1 ?? mark.diemHeSo1;
                newMark.diemHeSo1_2 = diemHeSo1_2 ?? mark.diemHeSo1_2;
                newMark.diemHeSo1_3 = diemHeSo1_3 ?? mark.diemHeSo1_3;
                newMark.diemHeSo1_4 = diemHeSo1_4 ?? mark.diemHeSo1_4;
                newMark.diemHeSo2 = diemHeSo2 ?? mark.diemHeSo2;
                newMark.diemHeSo2_2 = diemHeSo2_2 ?? mark.diemHeSo2_2;
                newMark.diemHeSo2_3 = diemHeSo2_3 ?? mark.diemHeSo2_3;
                newMark.diemHeSo3 = diemHeSo3 ?? mark.diemHeSo3;
                await newMark.save();
                await Mark.update(newMark.maDiem, {
                    diemHeSo1: newMark.diemHeSo1,
                    diemHeSo1_2: newMark.diemHeSo1_2,
                    diemHeSo1_3: newMark.diemHeSo1_3,
                    diemHeSo1_4: newMark.diemHeSo1_4,
                    diemHeSo2: newMark.diemHeSo2,
                    diemHeSo2_2: newMark.diemHeSo2_2,
                    diemHeSo2_3: newMark.diemHeSo2_3,
                    diemHeSo3: newMark.diemHeSo3,
                });
                return res.json({ success: true });
            } else {
                return res.json({ message: "Không tìm thấy điểm" });
            }
        } catch (error) {
            return res.json({ message: error });
        }
    },
    updateMultipleMark: async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        try {
            let { markArr } = req.body;
            markArr?.forEach(async (mark: Mark) => {
                const newMark = new Mark();
                newMark.maDiem = mark.maDiem;
                newMark.diemHeSo1 = mark.diemHeSo1;
                newMark.diemHeSo1_2 = mark.diemHeSo1_2;
                newMark.diemHeSo1_3 = mark.diemHeSo1_3;
                newMark.diemHeSo1_4 = mark.diemHeSo1_4;
                newMark.diemHeSo2 = mark.diemHeSo2;
                newMark.diemHeSo2_2 = mark.diemHeSo2_2;
                newMark.diemHeSo2_3 = mark.diemHeSo2_3;
                newMark.diemHeSo3 = mark.diemHeSo3;
                await newMark.save();
            });
            return res.json(markArr);
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    },
};

export default markController;
