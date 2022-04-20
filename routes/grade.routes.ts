import { Router } from "express";
import gradeController from "../controllers/grade.controller";
const route: Router = Router();

route.get("/", gradeController.getAll);
export default route;
