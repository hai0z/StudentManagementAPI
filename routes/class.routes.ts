import { Router } from "express";
import classController from "../controllers/class.controller";
const route: Router = Router();
//get
route.get("/", classController.getAllClass);
route.get("/:id", classController.getStudentByClass);
route.get("/:id/teacher", classController.getTeaherByClass);

export default route;
