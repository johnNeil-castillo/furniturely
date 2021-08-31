const express = require("express");

const router = express.Router();

// middlewares
const { authCheck } = require("../middlewares/auth");

// destructure controllers due to having many controllers
const { createOrUpdateUser } = require("../controllers/auth");

router.post("/create-or-update-user", authCheck, createOrUpdateUser);

module.exports = router;
