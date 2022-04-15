import { Router } from "express";
import subjectController from "../controllers/subject.controller";
import route from "./student.routes";
const router: Router = Router();

router.get("/", subjectController.getAll);
route.get("/:id", subjectController.getById);

//put
router.put("/:id", subjectController.update);

//delete
router.delete("/:id", subjectController.delete);
export default router;
