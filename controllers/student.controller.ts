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
        const { id } = req.params;
        try {
            const student = await Student.findOne(id, { relations: ["marks"] });
            const allMarks = await Mark.find({
                relations: ["monHoc_maMonHoc"],
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
        const { id } = req.params;
        try {
            const student = await Student.findOne(id, { relations: ["marks"] });
            const allMarks = await Mark.find({
                relations: ["monHoc_maMonHoc"],
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
    updateStudentMark: async (req: Request, res: Response) => {
        const {} = req.body;
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
            const subjects = await Subject.find();
            student.subjects = subjects;
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
};
export default studentController;
