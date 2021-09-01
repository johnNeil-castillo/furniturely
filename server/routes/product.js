const express = require("express");

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// destructure controllers due to having many controllers
const { create, read } = require("../controllers/product");

router.post("/product", authCheck, adminCheck, create);

router.get("/products", read);

module.exports = router;
