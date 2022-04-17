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

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import Student from "./entity/Student";
import Subject from "./entity/Subject";
import Mark from "./entity/Mark";
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
    const allMarks = await Mark.find();
    allMarks.forEach(async (element) => {
        const mark = new Mark();
        mark.maDiem = element.maDiem;
        mark.trungBinhMon = +(Math.random() * 3 + 10 - 3).toFixed(1);
        await mark.save();
    });
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
