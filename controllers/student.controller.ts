import Student from "../entity/Student";
import { Request, Response } from "express";
import Mark from "../entity/Mark";
import Subject from "../entity/Subject";

const studentController = {
    getAllStudent: async (_: Request, res: Response) => {
        try {
            const students = await Student.find({ relations: ["lop_maLop"] });
            return res.json(students);
        } catch (error) {
            return res.json({ message: error });
        }
    },
    getStudentById: async (req: Request, res: Response) => {
        try {
            const student = await Student.findOne(req.params.id, {
                relations: ["lop_maLop"],
            });
            return res.json(student);
        } catch (error) {
            return res.json({ message: error });
        }
    },
    getStudentMark: async (req: Request, res: Response) => {
        const { id, maHocKi } = req.params;
        try {
            const student = await Student.findOne(id, { relations: ["marks"] });
            const allMarks = await Mark.find({
                relations: ["monHoc_maMonHoc", "hocKi_maHocKi"],
                where: {
                    hocKi_maHocKi: maHocKi,
                },
            });

            const { marks, ...other } = student as Student;

            const studentMark = allMarks.filter((mark) => {
                return student?.marks
                    .map((mark) => mark.maDiem)
                    .includes(mark.maDiem);
            });
            return res.json({ ...other, studentMark });
        } catch (error) {
            return res.json({ message: error });
        }
    },
    getDiemTongKet: async (req: Request, res: Response) => {
        const { id, maHocKi } = req.params;
        try {
            const student = await Student.findOne(id, { relations: ["marks"] });
            const allMarks = await Mark.find({
                relations: ["monHoc_maMonHoc", "hocKi_maHocKi"],
                where: {
                    hocKi_maHocKi: maHocKi,
                },
            });

            const { marks, ...other } = student as Student;

            const studentMark = allMarks.filter((mark) => {
                return student?.marks
                    .map((mark) => mark.maDiem)
                    .includes(mark.maDiem);
            });
            const tongDiem = studentMark.reduce((acc, mark) => {
                return acc + mark.trungBinhMon;
            }, 0);

            const diemTongKet = (tongDiem / studentMark.length).toFixed(2);

            return res.json({ ...other, diemTongKet });
        } catch (error) {
            return res.json({ message: error });
        }
    },
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
            const allSubject = await Subject.find();
            student.subjects = allSubject;
            await student.save();
            const { subjects, ...other } = student as Student;
            return res.json({ success: true, ...other });
        } catch (error: any) {
            return res.json({ message: error.message });
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
    updateMark: async (req: Request, res: Response) => {
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
                return res.json({ success: true, data: newMark });
            } else {
                return res.json({ message: "Không tìm thấy điểm" });
            }
        } catch (error) {
            return res.json({ message: error });
        }
    },
    getMarkByClassAndSubject: async (req: Request, res: Response) => {
        const { maLop, maMonHoc } = req.params;
        try {
            const mark = await Mark.find({
                where: {
                    monHoc_maMonHoc: maMonHoc,
                    student: { lop_maLop: maLop },
                },
                relations: ["student"],
            });
            return res.json(mark);
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    },
};
export default studentController;
