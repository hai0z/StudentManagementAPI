import { Router } from "express";
import teacherController from "../controllers/teacher.controller";
const route: Router = Router();

//get
route.get("/", teacherController.getAllTeacher);
route.get("/:teacherId", teacherController.getTeacherById);
route.get("/:teacherId/class", teacherController.getClass);

//post
route.post("/create", teacherController.createTeacher);
route.post("/createTeaching", teacherController.createTeaching);

//put
route.put("/update/:teacherId", teacherController.updateTeacher);

export default route;
