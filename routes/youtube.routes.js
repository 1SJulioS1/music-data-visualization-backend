import { Router } from "express";
import { getPopularByRegion } from "../controllers/youtube.controller.js";

const router = Router();

// Define el endpoint
router.get("/popular/:regionCode", getPopularByRegion);

export default router;
