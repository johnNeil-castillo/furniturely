const express = require("express");
const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth");
const {
  create,
  read,
  remove,
  listAll,
  update,
  list,
  productsCount,
  productStar,
  listRelated,
  searchFilters,
} = require("../controllers/product");

// Products
router.post("/product", authCheck, adminCheck, create);
router.get("/products/total", productsCount);
router.get("/products/:count", listAll);
router.post("/products", list);
router.delete("/product/:slug", authCheck, adminCheck, remove);
router.get("/product/:slug", read);
router.put("/product/:slug", authCheck, adminCheck, update);

// Rating
router.put("/product/star/:productId", authCheck, productStar);

// Related
router.get("/product/related/:productId", listRelated);

// Search
router.post("/search/filters", searchFilters);

module.exports = router;
