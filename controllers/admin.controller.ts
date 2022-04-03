import { Request, Response } from "express";
import Student from "../entity/Student";
import Mark from "../entity/Mark";
import Subject from "../entity/Subject";
import Semester from "../entity/Semester";

const adminController = {
    createStudent: async (req: Request, res: Response) => {
        const { maHs, hoTen, ngaySinh, gioiTinh, lop_maLop, queQuan, diaChi } =
            req.body;
        try {
            const student = Student.create({
                maHs,
                hoTen,
                ngaySinh,
                gioiTinh,
                queQuan,
                diaChi,
                lop_maLop,
            });
            await student.save();
            return res.json(student);
        } catch (error) {
            return res.json({ message: error });
        }
    },
    updateStudent: async (req: Request, res: Response) => {
        const { id } = req.params;
        const { maHs, hoTen, ngaySinh, gioiTinh, lop_maLop, queQuan, diaChi } =
            req.body;
        try {
            const student = await Student.findOne(id);
            if (student) {
                await Student.update(id, {
                    maHs: maHs ?? student.maHs,
                    hoTen: hoTen ?? student.hoTen,
                    ngaySinh: ngaySinh ?? student.ngaySinh,
                    gioiTinh: gioiTinh ?? student.gioiTinh,
                    queQuan: queQuan ?? student.queQuan,
                    diaChi: diaChi ?? student.diaChi,
                    lop_maLop: lop_maLop ?? student.lop_maLop.maLop,
                });
                return res.json(student);
            }
            return res.json({ message: "Không tìm thấy sinh viên" });
        } catch (error) {
            return res.json({ message: error });
        }
    },
    createMark: async (req: Request, res: Response) => {
        const { maHocKi } = req.body;
        try {
            const student = await Student.find({ relations: ["marks"] });
            const semester = await Semester.findOne(maHocKi);
            const subject = await Subject.find();
            student.forEach(async (student) => {
                subject.forEach(async (item) => {
                    const mark = new Mark();
                    semester && (mark.hocKi_maHocKi = semester);
                    student && (mark.student = student);
                    mark.monHoc_maMonHoc = item;
                    await mark.save();
                    student?.marks.push(mark);
                });
            });
            return res.json(student);
        } catch (error) {
            return res.json({ message: error });
        }
    },
};

export default adminController;
