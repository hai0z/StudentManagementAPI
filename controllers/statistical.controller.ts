import { Request, Response } from "express";
import Mark from "../entity/Mark";
import Statistical from "../entity/Statistical";
import Student from "../entity/Student";
const statisticalController = {
    getAll: async (req: Request, res: Response): Promise<Response> => {
        try {
            const statistical = await Statistical.find();
            return res.json(statistical);
        } catch (error) {
            return res.json({ message: error });
        }
    },
    getByStudentId: async (req: Request, res: Response): Promise<Response> => {
        const { studentId } = req.params;
        try {
            const statistical = await Statistical.find({
                where: {
                    maHocSinh: studentId,
                },
                relations: ["maHocKi", "maHocSinh"],
            });
            if (statistical) {
                statistical.forEach(async (element) => {
                    const mark: any = await element?.tinhDiemTrungBinh(
                        studentId
                    );
                    element!.diemTrungBinh = +mark.toFixed(1);
                    await Statistical.update(element.maThongke, element!);
                    await element?.save();
                });
            }
            return res.json(statistical);
        } catch (error) {
            return res.json({ message: error });
        }
    },
    getByClassId: async (req: Request, res: Response) => {
        const student = await Student.find({
            relations: ["marks"],
            where: {
                lop_maLop: req.params.classId,
            },
        });

        const allMarks = await Mark.find({
            relations: ["monHoc_maMonHoc", "hocKi_maHocKi"],
            where: {
                hocKi_maHocKi: req.params.semesterId,
            },
        });
        const studentMark = student.map((student) => {
            let mark = allMarks.filter((mark) =>
                student.marks.map((mark) => mark.maDiem).includes(mark.maDiem)
            );
            mark.sort((a, b) => {
                return (
                    +a.monHoc_maMonHoc.maMonHoc - +b.monHoc_maMonHoc.maMonHoc
                );
            });
            const { marks, ...other } = student as Student;
            const xepLoai = () => {
                let tongDiem = 0;
                mark.forEach((element) => {
                    tongDiem += element.trungBinhMon;
                });
                tongDiem = +(tongDiem / mark.length).toFixed(1);

                const Gioi = mark.filter((x) => x.trungBinhMon >= 6.5);
                const Kha = mark.filter((x) => x.trungBinhMon >= 5);
                const TrungBinh = mark.filter((x) => x.trungBinhMon >= 3.5);
                if (
                    (mark[10].trungBinhMon >= 8 ||
                        mark[11].trungBinhMon >= 8) &&
                    tongDiem >= 8 &&
                    Gioi.length == mark.length
                ) {
                    return "Giỏi";
                }
                if (
                    (mark[10].trungBinhMon >= 6.5 ||
                        mark[11].trungBinhMon >= 6.5) &&
                    tongDiem >= 6.5 &&
                    Kha.length == mark.length
                ) {
                    return "Khá";
                }
                if (
                    (mark[10].trungBinhMon >= 5 ||
                        mark[11].trungBinhMon >= 5) &&
                    tongDiem >= 5 &&
                    TrungBinh.length == mark.length
                ) {
                    return "Trung bình";
                }
                return "Yếu";
            };

            return {
                ...other,
                marks: mark.map((mark) => ({
                    maMonHoc: +mark.monHoc_maMonHoc.maMonHoc,
                    tenMonHoc: mark.monHoc_maMonHoc.tenMonHoc,
                    diemTongKet: mark.trungBinhMon,
                })),
                tongKet: (
                    mark.reduce((acc, mark) => {
                        return acc + mark.trungBinhMon;
                    }, 0) / mark.length
                ).toFixed(1),
                xepLoai: xepLoai(),
            };
        });
        const gioiPercent = () => {
            let tongSoHocSinh = studentMark.length;
            let tongSoHocSinhGioi = studentMark.filter(
                (x) => x.xepLoai == "Giỏi"
            ).length;
            return ((tongSoHocSinhGioi / tongSoHocSinh) * 100).toFixed(1);
        };
        const khaPercent = () => {
            let tongSoHocSinh = studentMark.length;
            let tongSoHocSinhKha = studentMark.filter(
                (x) => x.xepLoai == "Khá"
            ).length;
            return ((tongSoHocSinhKha / tongSoHocSinh) * 100).toFixed(1);
        };
        const trungBinhPercent = () => {
            let tongSoHocSinh = studentMark.length;
            let tongSoHocSinhTrungBinh = studentMark.filter(
                (x) => x.xepLoai == "Trung bình"
            ).length;
            return ((tongSoHocSinhTrungBinh / tongSoHocSinh) * 100).toFixed(1);
        };
        const yeuPercent = () => {
            let tongSoHocSinh = studentMark.length;
            let tongSoHocSinhYeu = studentMark.filter(
                (x) => x.xepLoai == "Yếu"
            ).length;
            return ((tongSoHocSinhYeu / tongSoHocSinh) * 100).toFixed(1);
        };
        return res.json({
            studentMark,
            percent: {
                gioiPercent: gioiPercent(),
                khaPercent: khaPercent(),
                trungBinhPercent: trungBinhPercent(),
                yeuPercent: yeuPercent(),
            },
        });
    },
};

export default statisticalController;
