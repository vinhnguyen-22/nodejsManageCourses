const express = require("express");
const router = express.Router();

const siteController = require("../app/controllers/SiteController");

const newsController = require("../app/controllers/NewsController");

router.use("/search", siteController.search);
router.use("/", siteController.index);

module.exports = router;
