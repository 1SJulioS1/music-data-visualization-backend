import { Router } from "express";
import { getList } from "../controllers/netflix.controller.js";

const router = Router();
router.get("/popular/:country_iso2", getList);

export default router;
