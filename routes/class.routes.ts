import { Router } from "express";
import classController from "../controllers/class.controller";
const route: Router = Router();
//get
route.get("/", classController.getAllClass);
route.get("/:classId", classController.getClassById);
route.get("/:classId/student", classController.getStudentByClass);

//post
route.post("/", classController.createClass);

//put
route.put("/:classId", classController.updateClass);
export default route;
