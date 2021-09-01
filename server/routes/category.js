const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// destructure controllers due to having many controllers
const {
  create,
  read,
  update,
  remove,
  list,
} = require("../controllers/category");

// routes
router.post("/category", authCheck, adminCheck, create);
router.get("/categories", list);
router.get("/category/:slug", authCheck, adminCheck, read);
router.put("/category", authCheck, adminCheck, update);
router.delete("/category", authCheck, adminCheck, remove);

module.exports = router;
