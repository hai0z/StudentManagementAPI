import { Router } from "express";
import classController from "../controllers/class.controller";
const route: Router = Router();
//get
route.get("/", classController.getAllClass);
route.get("/:classId", classController.getClassById);
route.get("/:classId/student", classController.getStudentByClass);

//post
route.post("/create", classController.createClass);
export default route;
