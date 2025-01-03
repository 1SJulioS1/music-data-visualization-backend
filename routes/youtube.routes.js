import { Router } from "express";

import { getPopularByRegion } from "../controllers/youtube.controller.js";
import { getFlagByRegion } from "../controllers/flagController.js";
import {
  getPopularByRegion,
  getChannelById,
} from "../controllers/youtube.controller.js";

const router = Router();

// Define el endpoint

router.get("/flag/:regionCode", getFlagByRegion);
router.get("/popular/channel/:channelId", getChannelById);
router.get("/popular/videos/:regionCode", getPopularByRegion);

export default router;
