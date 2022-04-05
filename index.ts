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

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8080;

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

app.get("/", async (req: Request, res: Response) => {
    return res.send("hello");
});

app.use("/api/student", studentRoutes);
app.use("/api/class", classRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/semester", semesterRoutes);
app.use("/api/login", loginRoutes);
