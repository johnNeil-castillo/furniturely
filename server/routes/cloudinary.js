const express = require("express");
const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth");

// destructure controllers due to having many controllers
const { upload, remove } = require("../controllers/cloudinary");

router.post("/uploadimages", authCheck, adminCheck, upload);
router.post("/removeimage", authCheck, adminCheck, remove);

module.exports = router;