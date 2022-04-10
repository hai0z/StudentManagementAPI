import { Router } from "express";
import loginController from "../controllers/login.controller";

const route: Router = Router();

route.post("/student", loginController.studentLogin);
route.post("/teacher", loginController.teacherLogin);
route.post("/admin", loginController.adminLogin);
export default route;
