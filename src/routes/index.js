const router = require("express").Router();
const { fetchGeoData, getGeoDataById, saveGeoData, getGeoData } = require("../controllers/controller");

router.get("/external", fetchGeoData);

router.get("/:id", getGeoDataById);

router.post("/", saveGeoData);

router.get("/", getGeoData);

module.exports = router;
