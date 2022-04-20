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
import markRoutes from "./routes/mark.routes";
import subjectRoutes from "./routes/subject.routes";
import statisticalRoutes from "./routes/statistical.routes";
import adminRoutes from "./routes/admin.routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import Mark from "./entity/Mark";
import Student from "./entity/Student";
import Teacher from "./entity/Teacher";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8080;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
app.use(
    cors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    })
);
app.get("/", async (req: Request, res: Response) => {
    // const mark = await Mark.find();
    // mark.forEach(async (element) => {
    //     const mark = new Mark();
    //     mark.maDiem = element.maDiem;
    //     mark.diemHeSo1 = Math.floor(Math.random() * 5 + 5);
    //     mark.diemHeSo1_2 = Math.floor(Math.random() * 5 + 5);
    //     mark.diemHeSo2 = Math.floor(Math.random() * 5 + 5);
    //     mark.diemHeSo2_2 = Math.floor(Math.random() * 5 + 5);
    //     mark.diemHeSo3 = Math.floor(Math.random() * 5 + 5);
    //     await mark.save();
    // });
    // const student = await Student.find();
    // student.forEach(async (element) => {
    //     if (!element.gioiTinh) {
    //         Student.update(element.maHs, {
    //             img: "https://static.vecteezy.com/system/resources/previews/002/275/847/original/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg",
    //         });
    //     } else {
    //         Student.update(element.maHs, {
    //             img: "https://static.vecteezy.com/system/resources/previews/004/773/704/large_2x/a-girl-s-face-with-a-beautiful-smile-a-female-avatar-for-a-website-and-social-network-vector.jpg",
    //         });
    //     }
    // });
    // const teacher = await Teacher.find();
    // teacher.forEach(element=>{
    //     if(element.gioiTinh){

    //     }
    // })
    return res.json({ message: "hello" });
});
app.use("/api/student", studentRoutes);
app.use("/api/class", classRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/semester", semesterRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/mark", markRoutes);
app.use("/api/subject", subjectRoutes);
app.use("/api/statistical", statisticalRoutes);
app.use("/api/admin", adminRoutes);
