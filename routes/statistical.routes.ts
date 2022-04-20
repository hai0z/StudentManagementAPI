import { Router } from "express";
import statisticalController from "../controllers/statistical.controller";
const route: Router = Router();

//get
route.get("/", statisticalController.getAll);
route.get("/student/:studentId/", statisticalController.getByStudentId);
route.get("/class/:classId/:semesterId", statisticalController.getByClassId);

route.get(
    "/class/:classId/namHoc/:namHoc",
    statisticalController.getByClassIdAndNamHoc
);

export default route;
