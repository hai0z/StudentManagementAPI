import Teacher from "../entity/Teacher";
import { Request, Response } from "express";
import Class from "../entity/Class";
import Subject from "../entity/Subject";
import Student from "../entity/Student";

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
            const subjectHasStudent = await Subject.find({
                relations: ["teachers", "student"],
            });

            const classHasStudent = await Class.find({
                relations: ["students"],
            });

            const filterByTeacherId = subjectHasStudent.filter((subject) => {
                return subject.teachers
                    .map((teacher) => teacher.maGiaoVien)
                    .includes(teacherId);
            });

            const value = filterByTeacherId.map((students) => {
                const getStudentInClass = students.student.map((name) => {
                    return name.hoTen;
                });
                const getClassName = classHasStudent.filter((class_) => {
                    return getStudentInClass.includes(class_.students[0].hoTen);
                });
                const { student, teachers, ...other } = students;
                const { maGiaoVien, tenGiaoVien } = teachers[0];
                return {
                    subject: other,
                    teacher: { maGiaoVien, tenGiaoVien },
                    class: getClassName,
                };
            });
            return res.json({
                data: value,
            });
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    },
};
export default teacherController;
