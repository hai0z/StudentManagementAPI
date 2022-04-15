import { Router } from "express";
import teacherController from "../controllers/teacher.controller";
const route: Router = Router();

//get
route.get("/", teacherController.getAllTeacher);
route.get("/:teacherId", teacherController.getTeacherById);
route.get("/:teacherId/class", teacherController.getClass);

//post
route.post("/", teacherController.createTeacher);
route.post("/createTeaching", teacherController.createTeaching);

//put
route.put("/:teacherId", teacherController.updateTeacher);

export default route;
