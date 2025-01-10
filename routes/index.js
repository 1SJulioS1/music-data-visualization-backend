import { Router } from "express";
import youtubeRoutes from "./youtube.routes.js";
import spotifyRoutes from "./spotify.routes.js";

const router = Router();

router.use("/youtube", youtubeRoutes);
router.use("/spotify", spotifyRoutes);

export default router;
