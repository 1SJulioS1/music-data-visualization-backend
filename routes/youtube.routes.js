import { Router } from "express";
import { getPopularByRegion } from "../controllers/youtube.controller.js";
import { getFlagByRegion } from "../controllers/flagController.js";

const router = Router();

// Define el endpoint
router.get("/popular/:regionCode", getPopularByRegion);
router.get("/flag/:regionCode", getFlagByRegion);

export default router;
