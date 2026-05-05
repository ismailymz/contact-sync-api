import { Router } from "express";
import { contactController } from "../controllers/contactController";
import { validateBody, createContactSchema, updateContactSchema } from "../middleware/validateRequest";
const router = Router();

router.post("/", validateBody(createContactSchema), contactController.create);
router.get("/", contactController.getAll);
router.get("/:id", contactController.getById);
router.patch("/:id", validateBody(updateContactSchema), contactController.update);
router.delete("/:id", contactController.remove);

export default router;