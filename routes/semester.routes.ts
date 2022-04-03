import { Router } from "express";
import semesterController from "../controllers/semester.controller";

const route: Router = Router();

route.get("/", semesterController.getAllSemester);

//post
route.post("/create", semesterController.createSemester);
export default route;
