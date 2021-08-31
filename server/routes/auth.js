const express = require("express");

const router = express.Router();

// destructure controllers
const { createOrUpdateUser } = require("../controllers/auth");

router.get("/create-or-update-user", createOrUpdateUser);

module.exports = router;
