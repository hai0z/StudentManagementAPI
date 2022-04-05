import { Router } from "express";
import teacherController from "../controllers/teacher.controller";
const route: Router = Router();

//get
route.get("/", teacherController.getAllTeacher);
route.get("/:teacherId", teacherController.getTeacherById);
route.get("/class/:teacherId", teacherController.getClass);
route.get(
    "/getMark/:classId/:subjectId/:semesterId",
    teacherController.getMark
);

//post
route.post("/create", teacherController.createTeacher);
route.post("/create/mark", teacherController.createMark);

//put
route.put("/update/:teacherId", teacherController.updateTeacher);
route.put("/updateMark", teacherController.updateMark);
export default route;
