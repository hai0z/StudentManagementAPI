import { Router } from "express";
import studentController from "../controllers/student.controller";
const route: Router = Router();

//get
route.get("/", studentController.getAllStudent);
route.get("/:id", studentController.getStudentById);
route.get("/:id/marks/:maHocKi", studentController.getStudentMark);
route.get("/:id/marks/tong-ket", studentController.getDiemTongKet);

//post
route.post("/create", studentController.createStudent);

//put
route.put("/update/:id", studentController.updateStudent);

export default route;
