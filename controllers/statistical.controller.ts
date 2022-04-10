import { Request, Response } from "express";
import Statistical from "../entity/Statistical";
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
                    element!.diemTrungBinh = mark;
                    await Statistical.update(element.maThongke, element!);
                    await element?.save();
                });
            }
            return res.json(statistical);
        } catch (error) {
            return res.json({ message: error });
        }
    },
};

export default statisticalController;
