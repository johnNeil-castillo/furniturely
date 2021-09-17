import React, { useEffect, useState } from "react";
import { getProduct, productStar } from "../../functions/product";
import SingleProduct from "./cards/SingleProduct";
import { useSelector } from "react-redux";
import { getRelated } from "../../functions/product";
import ProductCard from "../product/cards/ProductCard";
import LoadingCard from "../product/cards/LoadingCard";

import { Divider, Skeleton } from "antd";

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const [star, setStar] = useState(0);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  const { slug } = match.params;

  useEffect(() => {
    const loadSingleProduct = () => {
      setLoading(true);
      getProduct(slug).then((res) => {
        setProduct(res.data);
        getRelated(res.data._id).then((res) => setRelated(res.data));
        setLoading(false);
      });
    };
    loadSingleProduct();
  }, [slug]);

  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star);
    }
  }, [product.ratings, user]);

  const loadProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data);
      getRelated(res.data._id).then((res) => setRelated(res.data));
    });
  };

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    console.table(newRating, name);
    productStar(name, newRating, user.token).then((res) => {
      console.log("rating clicked", res.data);
      loadProduct();
    });
  };

  return (
    <>
      <div className="container">
        {loading ? (
          <>
            <div className="row">
              <div className="col-md-8">
                <Skeleton active className="p-5 " />
              </div>
              <div className="col-md-4">
                <Skeleton active className="p-5 " />
              </div>
            </div>
            <div className="row">
              <Skeleton active className="p-5 " />
            </div>
            <div className="row">
              <LoadingCard count={4} />
            </div>
          </>
        ) : (
          <>
            <div className="row pt-4">
              <SingleProduct
                product={product}
                onStarClick={onStarClick}
                star={star}
              />
            </div>
            <div className="row ">
              <div className="col text-center pt-5 pb-5">
                <Divider />
                <h4>Related Products</h4>
                <Divider />
              </div>
            </div>
            <div className="row pb-5">
              {related.length ? (
                related.map((r) => (
                  <div key={r._id} className="col-md-3 mb-3">
                    <ProductCard product={r} />
                  </div>
                ))
              ) : (
                <div className="text-center">No products found</div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Product;
