import { Router } from "express";
import studentController from "../controllers/student.controller";
const route: Router = Router();

//get
route.get("/", studentController.getAllStudent);
route.get("/:id", studentController.getStudentById);
route.get("/:id/marks/:maHocKi", studentController.getStudentMark);
route.get("/:id/marks/:maHocKi/tong-ket", studentController.getDiemTongKet);

//post
route.post("/", studentController.createStudent);

//put
route.put("/:id", studentController.updateStudent);

export default route;
