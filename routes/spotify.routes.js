import { Router } from "express";
import { getPlaylist } from "../controllers/spotify.controller.js";

const router = Router();
router.get("/popular/:country", getPlaylist);

export default router;
