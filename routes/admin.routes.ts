import { Router } from "express";
import adminController from "../controllers/admin.controller";
const route: Router = Router();

route.get("/studentAccount", adminController.getAllStudentAccount);
route.get("/teacherAccount", adminController.getAllTeacherAccount);

route.put("/studentAccount/:id", adminController.updateStudentAccount);
route.put("/teacherAccount/:id", adminController.updateTeacherAccount);

export default route;
