import { Router } from "express";
import classController from "../controllers/class.controller";
const route: Router = Router();

route.get("/", classController.getAllClass);
route.get("/:classId", classController.getClassById);
route.get("/:classId/student", classController.getStudentByClass);

//post
route.post("/", classController.createClass);

//put
route.put("/:classId", classController.updateClass);
//delete
route.delete("/:classId", classController.deleteClass);
export default route;
