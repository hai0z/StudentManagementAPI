import { Router } from "express";
import semesterController from "../controllers/semester.controller";

const route: Router = Router();

route.get("/", semesterController.getAllSemester);

export default route;
