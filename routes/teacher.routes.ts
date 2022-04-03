import { Router } from "express";
import teacherController from "../controllers/teacher.controller";
const route: Router = Router();

//get
route.get("/", teacherController.getAllTeacher);
route.get("/:teacherId", teacherController.getClassByTeacher);

//post
route.post("/create", teacherController.createTeacher);
export default route;
