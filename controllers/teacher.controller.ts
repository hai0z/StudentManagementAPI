import Teacher from "../entity/Teacher";
import { Request, Response } from "express";
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
    getTeacherById: async (req: Request, res: Response): Promise<Response> => {
        const { teacherId } = req.params;
        try {
            const teacher = await Teacher.findOne(teacherId);
            return res.json(teacher);
        } catch (error) {
            return res.json({ message: error });
        }
    },
    getClass: async (req: Request, res: Response): Promise<Response> => {
        const { teacherId } = req.params;
        try {
            const teaching = await Teaching.find({
                where: {
                    maGiaoVien: teacherId,
                },
                relations: ["maGiaoVien", "maLop", "maMonHoc", "maHocKy"],
            });
            const t = teaching.map((x: any) => ({
                maLop: x.maLop.maLop,
                tenLop: x.maLop.tenLop,
                tenMonHoc: x.maMonHoc.tenMonHoc,
                maMonHoc: x.maMonHoc.maMonHoc,
                maHocKi: x.maHocKy.maHocKi,
            }));

            return res.status(200).json(t);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
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
    updateTeacher: async (req: Request, res: Response): Promise<Response> => {
        const { teacherId } = req.params;
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
            const teacher = await Teacher.findOne(teacherId);
            if (teacher) {
                await Teacher.update(teacherId, {
                    maGiaoVien: maGiaoVien ?? teacher.maGiaoVien,
                    tenGiaoVien: tenGiaoVien ?? teacher.tenGiaoVien,
                    gioiTinh: gioiTinh ?? teacher.gioiTinh,
                    ngaySinh: ngaySinh ?? teacher.ngaySinh,
                    diaChi: diaChi ?? teacher.diaChi,
                    soDienThoai: soDienThoai ?? teacher.soDienThoai,
                    email: email ?? teacher.email,
                });
                return res.json({ message: "Update success", teacher });
            }
            return res
                .status(404)
                .json({ message: "Không tìm thấy giáo viên" });
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    },
    createTeaching: async (req: Request, res: Response): Promise<Response> => {
        const { maGiaoVien, maLop, maMonHoc, maHocKy } = req.body;
        try {
            const teaching = Teaching.create({
                maGiaoVien,
                maLop,
                maMonHoc,
                maHocKy,
            });
            await teaching.save();
            return res.json(teaching);
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    },
    deleteTeacher: async (req: Request, res: Response): Promise<Response> => {
        const { teacherId } = req.params;
        try {
            const teacher = await Teacher.findOne(teacherId);
            if (teacher) {
                await Teacher.delete(teacherId);
                return res.json({ message: "Delete success" });
            }
            return res
                .status(404)
                .json({ message: "Không tìm thấy giáo viên" });
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    },
};
export default teacherController;
