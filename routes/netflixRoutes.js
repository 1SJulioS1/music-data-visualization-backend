import { Router } from "express";
import { getList } from "../controllers/netflix.controller.js";

const router = Router();
router.get("/popular/", getList);

export default router;
