import { Router } from "express";
import studentController from "../controllers/student.controller";
const route: Router = Router();

//get
route.get("/", studentController.getAllStudent);
route.get("/:id", studentController.getStudentById);
route.get("/:id/marks/:maHocKi", studentController.getStudentMark);
route.get("/:id/marks/:maHocKi/tong-ket", studentController.getDiemTongKet);
route.get(
    "/:maLop/:maMonHoc/:maHocKi",
    studentController.getMarkByClassAndSubject
);
//post
route.post("/create", studentController.createStudent);
route.post("/:id/createMark", studentController.createMark);
//put
route.put("/update/", studentController.updateStudent);
route.put("/updateMark/", studentController.updateMark);
export default route;
