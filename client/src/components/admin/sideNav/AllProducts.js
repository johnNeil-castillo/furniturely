import React, { useEffect, useState } from "react";
import AdminNav from "../AdminNav";
import { getProductsByCount } from "../../../functions/product";
import AdminProductCard from "../AdminProductCard";
import { removeProduct } from "../../../functions/product";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Spin, Row, Col } from "antd";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(100)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const handleRemove = (slug) => {
    let answer = window.confirm(`Are you sure you want to delete ${slug}`);
    if (answer) {
      removeProduct(slug, user.token)
        .then((res) => {
          loadAllProducts();
          toast.success(`${res.data.title} is deleted`);
        })
        .catch((err) => {
          if (err.response.status === 400) toast.error(err.response.data);
          console.log(err);
        });
    }
  };

  return (
    <div className="container">
      <div>
        <Row justify="center">
          <Col span={24} className="text-center mb-4">
            <AdminNav />
          </Col>
        </Row>
        <div className="col col-md-12">
          {loading ? (
            <h4 className="my-2 text-center text-danger">
              <Spin />
            </h4>
          ) : (
            <>
              <h4 className="my-2 text-center">All Products</h4>
              <div className="col">
                <div className="row">
                  {products.map((product) => (
                    <div key={product._id} className="col-md-4 pb-3">
                      <AdminProductCard
                        product={product}
                        handleRemove={handleRemove}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
