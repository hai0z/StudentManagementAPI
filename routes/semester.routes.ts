import { Router } from "express";
import semesterController from "../controllers/semester.controller";

const route: Router = Router();

route.get("/", semesterController.getAllSemester);
route.get("/:semesterId", semesterController.getSemesterById);
//post
route.post("/", semesterController.createSemester);

//delete
route.delete("/:semesterId", semesterController.deleteSemester);
export default route;
