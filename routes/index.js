const { Router } = require("express");
const youtubeRoutes = require("./youtube.routes");

const router = Router();

// Montamos /youtube
router.use("/youtube", youtubeRoutes);

module.exports = router;
