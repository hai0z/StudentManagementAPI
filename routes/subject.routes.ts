import { Router } from "express";
import subjectController from "../controllers/subject.controller";
import route from "./student.routes";
const router: Router = Router();

router.get("/", subjectController.getAll);
route.get("/:id", subjectController.getById);

//put
router.put("/update/:id", subjectController.update);
export default router;
