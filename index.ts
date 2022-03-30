import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createConnection } from "typeorm";
import "reflect-metadata";

//route
import studentRoutes from "./routes/student.routes";
import classRoutes from "./routes/class.routes";
import teacherRoutes from "./routes/teacher.routes";
import semesterRoutes from "./routes/semester.routes";
import loginRoutes from "./routes/login.routes";
//
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8080;
//test
import Mark from "./entity/Mark";
import Student from "./entity/Student";
import Semester from "./entity/Semester";
import Subject from "./entity/Subject";

const bootstrap = async (): Promise<void> => {
    await createConnection()
        .then(() => console.log("connected to mysql db"))
        .catch((err) => console.log(err));
    app.listen(PORT, () => {
        console.log(`doan1 listening at http://localhost:${PORT}`);
    });
};
bootstrap();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", async (_: Request, res: Response) => {
    const mark = new Mark();
    const semester = await Semester.findOne("2(2022-2023)");
    const subject = await Subject.findOne("Toan10");
    mark.diemHeSo1 = 7;
    mark.diemHeSo1_2 = 9;
    mark.diemHeSo2 = 7;

    if (semester) {
        mark.hocKi_maHocKi = semester;
    }
    if (subject) {
        mark.monHoc_maMonHoc = subject;
    }
    await mark.save();
    const student = await Student.findOne("hs004", { relations: ["marks"] });
    student?.marks.push(mark);
    await student?.save();
    return res.json(student?.marks);
});

app.use("/api/student", studentRoutes);
app.use("/api/class", classRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/semester", semesterRoutes);
app.use("/api/login", loginRoutes);
