import { Router } from "express";
import markController from "../controllers/mark.controller";
const route: Router = Router();

//get
route.get("/", markController.getAllMark);
route.get("/:maDiem", markController.getSingleMark);
route.get("/:maMonHoc/:maLop/:maHocKi", markController.getMark);

//post
route.post("/", markController.createMark);

//put

route.put("/multiMark", markController.updateMultipleMark);
route.put("/:maDiem", markController.updateMark);

export default route;
