import React from "react";
import ModalImage from "react-modal-image";
import sampleImage from "../../images/SampleImage.png";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";

import { Input, Row, Col } from "antd";

const ProductCardInCheckout = ({ p }) => {
  let dispatch = useDispatch();

  const handleQuantityChange = (e) => {
    let count = e.target.value < 1 ? 1 : e.target.value;

    if (count > p.quantity) {
      toast.error(`Max available quantity: ${p.quantity}`);
      return;
    }

    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].count = count;
        }
        return null;
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleRemove = () => {
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id === p._id) {
          cart.splice(i, 1);
        }
        return null;
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  return (
    <div>
      <Row justify="center">
        <div className="text-center mb-3">
          <b>{p.title}</b>
        </div>
      </Row>
      <Row justify="center">
        <div>
          <div
            className="text-center"
            style={{
              width: "100px",
              height: "auto",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {p.images.length ? (
              <ModalImage small={p.images[0].url} large={p.images[0].url} />
            ) : (
              <ModalImage small={sampleImage} large={sampleImage} />
            )}
          </div>
        </div>
      </Row>

      <Row justify="center">
        <div className="text-center mt-2 ">
          <b>${p.price.toLocaleString()}</b>
        </div>
      </Row>
      <Row justify="center">
        <div className="text-center ">{p.brand}</div>
      </Row>
      <Row justify="center">
        <div className=" mt-2">{p.color}</div>
      </Row>

      <Row justify="center">
        <div className="text-center mt-2">
          <Input
            style={{ width: 100 }}
            size="medium"
            type="number"
            value={p.count}
            onChange={handleQuantityChange}
          />
        </div>
      </Row>
      <Row justify="center">
        <Col xs={{ pull: 5 }} md={{ pull: 3 }}>
          <div className="text-center py-4">
            {p.shipping === "Yes" ? (
              <>
                <p>Shipping</p>
                <CheckCircleOutlined className="text-success" />
              </>
            ) : (
              <>
                <p>Shipping</p>
                <CloseCircleOutlined className="text-danger" />
              </>
            )}
          </div>
        </Col>
        <Col xs={{ push: 5 }} md={{ push: 3 }}>
          <div className="text-center py-4">
            <p>Remove</p>
            <CloseOutlined
              onClick={handleRemove}
              className="text-danger pointer"
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductCardInCheckout;
