import { Router } from "express";
import youtubeRoutes from "./youtube.routes.js";
import spotifyRoutes from "./spotify.routes.js";
import netflixRoutes from "./netflixRoutes.js";

const router = Router();

router.use("/youtube", youtubeRoutes);
router.use("/spotify", spotifyRoutes);
router.use("/netflix", netflixRoutes);

export default router;
