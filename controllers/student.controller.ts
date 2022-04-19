import Student from "../entity/Student";
import { Request, Response } from "express";
import Mark from "../entity/Mark";
import Subject from "../entity/Subject";
import Semester from "../entity/Semester";
import Statistical from "../entity/Statistical";
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
            //check if student exist
            if (!student) {
                return res.status(404).json({ message: "Student not found" });
            }
            const { lop_maLop, ...other } = student;
            return res.json({ user: other, lop_maLop });
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

            const studentMark = allMarks
                .filter((mark) => {
                    return student?.marks
                        .map((mark) => mark.maDiem)
                        .includes(mark.maDiem);
                })
                .sort((a, b) => {
                    return (
                        +a.monHoc_maMonHoc.maMonHoc -
                        +b.monHoc_maMonHoc.maMonHoc
                    );
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

            const diemTongKet = (tongDiem / studentMark.length).toFixed(1);

            return res.json({ ...other, diemTongKet });
        } catch (error) {
            return res.json({ message: error });
        }
    },
    createStudent: async (req: Request, res: Response) => {
        const { maHs, hoTen, ngaySinh, gioiTinh, lop_maLop, queQuan, diaChi } =
            req.body;
        const currentSemester = "1(2021-2022)";
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
            const check = await Student.findOne(maHs);
            if (check) {
                return res.json({ message: "Student already exists" });
            }
            await student.save();
            const relations = await Student.findOne(maHs);
            const subject = await Subject.find();
            const semester = await Semester.findOne(currentSemester);
            const statistical = new Statistical();
            if (semester) {
                statistical.maHocKi = semester;
            }
            statistical.maHocSinh = student;
            await statistical.save();
            subject.forEach(async (item) => {
                const mark = new Mark();
                if (semester) {
                    mark.hocKi_maHocKi = semester;
                }
                mark.student = relations;
                mark.monHoc_maMonHoc = item;
                await mark.save();
                student?.marks?.push(mark);
            });
            await student.save();
            return res.json({ success: true, student });
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    },
    updateStudent: async (req: Request, res: Response) => {
        const { id } = req.params;
        const { maHs, hoTen, ngaySinh, gioiTinh, maLop, queQuan, diaChi } =
            req.body;
        try {
            const student = await Student.findOne(id, {
                relations: ["lop_maLop"],
            });
            if (student) {
                try {
                    await Student.update(id, {
                        maHs: maHs ?? student.maHs,
                        hoTen: hoTen ?? student.hoTen,
                        ngaySinh: ngaySinh ?? student.ngaySinh,
                        gioiTinh: gioiTinh ?? student.gioiTinh,
                        queQuan: queQuan ?? student.queQuan,
                        diaChi: diaChi ?? student.diaChi,
                        lop_maLop: maLop ?? student.lop_maLop.maLop,
                    });
                    const studentAfterUpdate = await Student.findOne(id, {
                        relations: ["lop_maLop"],
                    });
                    const { lop_maLop, ...other } =
                        studentAfterUpdate as Student;
                    return res.json({ user: other, lop_maLop });
                } catch (error: any) {
                    return res.status(500).json({ message: error.message });
                }
            }
            return res.status(404).json({ message: "Không tìm thấy học sinh" });
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    },
    deleteStudent: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const student = await Student.findOne(id);
            if (student) {
                await Student.delete(id);
                return res.status(200).json({ success: true });
            }
            return res.status(404).json({ message: "Không tìm thấy học sinh" });
        } catch (error) {
            return res.json({ message: error });
        }
    },
};
export default studentController;
