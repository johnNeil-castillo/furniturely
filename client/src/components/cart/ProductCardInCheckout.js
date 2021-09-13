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

import { Input } from "antd";

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
    <tbody>
      <tr>
        <td>
          <div
            className="py-1"
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
        </td>
        <td className="text-center py-4 ">{p.title}</td>
        <td className="text-center py-4">
          <b>${p.price}</b>
        </td>
        <td className="text-center py-4">{p.brand}</td>
        <td className="text-center py-4">{p.color}</td>
        <td className="text-center py-4">
          <Input
            style={{ width: 100 }}
            size="medium"
            type="number"
            value={p.count}
            onChange={handleQuantityChange}
          />
        </td>
        <td className="text-center py-4">
          {p.shipping === "Yes" ? (
            <CheckCircleOutlined className="text-success" />
          ) : (
            <CloseCircleOutlined className="text-danger" />
          )}
        </td>
        <td className="text-center py-4">
          <CloseOutlined
            onClick={handleRemove}
            className="text-danger pointer"
          />
        </td>
      </tr>
    </tbody>
  );
};

export default ProductCardInCheckout;
