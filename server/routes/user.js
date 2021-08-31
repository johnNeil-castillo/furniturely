const express = require("express");

const router = express.Router();

router.get("/user", (req, res) => {
  res.json({
    data: "hello u r in user",
  });
});

module.exports = router;
