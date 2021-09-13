import React, { useEffect, useState } from "react";
import { getProducts, getProductsCount } from "../../functions/product";
import ProductCard from "../product/cards/ProductCard";
import LoadingCard from "../product/cards/LoadingCard";
import { Pagination } from "antd";

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadAllProducts = () => {
      setLoading(true);
      getProducts("sold", "desc", page).then((res) => {
        setProducts(res.data);
        setLoading(false);
      });
    };
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);

  return (
    <>
      <div className="container">
        {loading ? (
          <LoadingCard count={4} />
        ) : (
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-3">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <nav className="align-middle col-md-4 offset-md-4 text-center ">
          <Pagination
            className="p-5"
            size="small"
            current={page}
            total={(productsCount / 4) * 10}
            onChange={(value) => setPage(value)}
          />
        </nav>
      </div>
    </>
  );
};

export default BestSellers;
