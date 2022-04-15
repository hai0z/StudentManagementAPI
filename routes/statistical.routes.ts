import { Router } from "express";
import statisticalController from "../controllers/statistical.controller";
const route: Router = Router();

//get
route.get("/", statisticalController.getAll);
route.get("/:studentId", statisticalController.getByStudentId);

export default route;
