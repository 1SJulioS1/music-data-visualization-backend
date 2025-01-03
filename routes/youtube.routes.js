import { Router } from "express";
import {
  getPopularByRegion,
  getChannelById,
} from "../controllers/youtube.controller.js";

const router = Router();

// Define el endpoint
router.get("/popular/channel/:channelId", getChannelById);
router.get("/popular/videos/:regionCode", getPopularByRegion);

export default router;
