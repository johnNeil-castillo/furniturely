import React, { useState } from "react";
import { Card, Tabs, Tooltip, Image } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import sampleImage from "../../../images/SampleImage.png";
import ProductListItems from "./ProductListItems";
import StarRating from "react-star-ratings";
import RatingModal from "../../modal/RatingModal";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { addToWishlist } from "../../../functions/user";

const { TabPane } = Tabs;

const SingleProduct = ({ product, onStarClick, star }) => {
  const [tooltip, setTooltip] = useState("Click to add");

  let history = useHistory();

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const { title, images, description, _id } = product;

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

  const handleAddToWishList = (e) => {
    e.preventDefault();
    if (user) {
      addToWishlist(product._id, user.token).then((res) => {
        console.log("added to wishlist", res.data);
        toast.success("Added to wishlist");
        history.push("/user/wishlist");
      });
    } else {
      history.push("/login");
    }
  };

  return (
    <>
      <div className="col-md-8">
        {images && images.length ? (
          <>
            <div className="row">
              <Image.PreviewGroup>
                {images &&
                  images.map((i) => (
                    <div className="col-md-6 mb-3">
                      <Image alt="sample" src={i.url} key={i.public_id} />
                    </div>
                  ))}
              </Image.PreviewGroup>
            </div>
          </>
        ) : (
          <Card cover={<img alt="sample" src={sampleImage} />}></Card>
        )}
      </div>

      <div className="col-md-4">
        <Card className="mb-2 fs-3 text-center">{title}</Card>
        <Card
          actions={[
            <Tooltip title={tooltip}>
              <p onClick={handleAddToCart} disabled={product.quantity < 1}>
                <ShoppingCartOutlined className="text-danger" /> <br />
                {product.quantity < 1 ? "Out of stock" : "Add to Cart"}
              </p>
            </Tooltip>,
            <p onClick={handleAddToWishList}>
              <HeartOutlined className="text-info" />
              <br />
              {!user ? "Login to add wishlist" : "Add to WishList"}
            </p>,
            <RatingModal>
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor="red"
              />
            </RatingModal>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>

      <div className="col-md-4"></div>
      <div className="mt-3">
        <Tabs type="card">
          <TabPane style={{ whiteSpace: "pre-wrap" }} tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call us on to learn more about this product
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default SingleProduct;
