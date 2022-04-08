import { Router } from "express";
import loginController from "../controllers/login.controller";

const route: Router = Router();

route.post("/?role=student", loginController.studentLogin);
route.post("/?role=teacher", loginController.teacherLogin);
export default route;
