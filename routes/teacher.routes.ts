import { Router } from "express";
import teacherController from "../controllers/teacher.controller";
const route: Router = Router();

route.get("/", teacherController.getAllTeacher);
route.get("/:teacherId", teacherController.getClassByTeacher);
export default route;
