import { Router } from "express";
import loginController from "../controllers/login.controller";

const route: Router = Router();

route.post("/", loginController.login);

export default route;
