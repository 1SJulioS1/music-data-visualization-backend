const { Router } = require("express");
const { getPopularByRegion } = require("../controllers/youtube.controller");

const router = Router();

// GET /api/youtube/popular/:regionCode
router.get("/popular/:regionCode", getPopularByRegion);

module.exports = router;
