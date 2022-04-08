import { Router } from "express";
import markController from "../controllers/mark.controller";
const route: Router = Router();

//get
route.get("/:maDiem", markController.getSingleMark);
route.get("/:maMonHoc/:maLop/:maHocKi", markController.getMark);

//post
route.post("/create", markController.createMark);

//put
route.put("/update/:maDiem", markController.updateMark);

export default route;
