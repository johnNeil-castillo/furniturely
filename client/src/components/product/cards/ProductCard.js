import React, { useState } from "react";
import { Card } from "antd";
import sampleImage from "../../../images/SampleImage.png";
import { Link } from "react-router-dom";
import _ from "lodash";
import { useDispatch } from "react-redux";

const ProductCard = ({ product }) => {
  const [setTooltip] = useState("Click to add");

  const { images, title, slug, price, brand } = product;

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (product.quantity < 1) {
      return;
    }
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.push({
        ...product,
        count: 1,
      });

      let unique = _.uniqWith(cart, _.isEqual);

      localStorage.setItem("cart", JSON.stringify(unique));

      setTooltip("Added");

      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });

      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };

  return (
    <>
      <Link to={`/product/${slug}`}>
        <Card
          hoverable
          cover={
            <img
              alt="sample"
              src={images && images.length ? images[0].url : sampleImage}
              style={{ height: "200px", objectFit: "cover" }}
            />
          }
        >
          <Card.Meta title={`${title}`} />
          <div>{brand}</div>
          <h5 className="mt-3"> {`$${price.toLocaleString()}`}</h5>
        </Card>
      </Link>
    </>
  );
};

export default ProductCard;
