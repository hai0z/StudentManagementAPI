import Teacher from "../entity/Teacher";
import { Request, Response } from "express";
import Mark from "../entity/Mark";
import Teaching from "../entity/Teaching";
const teacherController = {
    getAllTeacher: async (_: Request, res: Response): Promise<Response> => {
        try {
            const teachers = await Teacher.find();
            return res.json(teachers);
        } catch (error) {
            return res.json({ message: error });
        }
    },
    getClassByTeacher: async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        const { teacherId } = req.params;
        try {
            const teaching = await Teaching.find({
                where: {
                    maGiaoVien: teacherId,
                },
                relations: ["maGiaoVien", "maLop", "maMonHoc", "maHocKy"],
            });
            return res.json(teaching);
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    },
    createTeacher: async (req: Request, res: Response): Promise<Response> => {
        const {
            maGiaoVien,
            tenGiaoVien,
            gioiTinh,
            ngaySinh,
            diaChi,
            soDienThoai,
            email,
        } = req.body;
        try {
            const teacher = Teacher.create({
                maGiaoVien,
                tenGiaoVien,
                gioiTinh,
                ngaySinh,
                diaChi,
                soDienThoai,
                email,
            });
            await teacher.save();
            return res.json(teacher);
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
};
export default teacherController;
