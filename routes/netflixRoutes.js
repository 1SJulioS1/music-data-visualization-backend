import { Router } from "express";
import {
  getPopularMovies,
  getPopularShows,
} from "../controllers/netflix.controller.js";

const router = Router();
router.get("/popular/movies/:country_iso2", getPopularMovies);
router.get("/popular/shows/:country_iso2", getPopularShows);

export default router;
