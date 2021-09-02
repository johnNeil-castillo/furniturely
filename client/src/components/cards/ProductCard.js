import React from "react";
import { Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import sampleImage from "../../images/SampleImage.png";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { images, title, description, slug } = product;

  return (
    <Card
      cover={
        <img
          src={images && images.length ? images[0].url : sampleImage}
          style={{ height: "150px", objectFit: "cover" }}
          className="p-2"
        />
      }
      actions={[
        <Link to={`/product/${slug}`}>
          <EyeOutlined className="text-warning" />
          <br /> View Product
        </Link>,
        <>
          <ShoppingCartOutlined className="text-danger" /> <br /> Add to Cart
        </>,
      ]}
    >
      <Card.Meta
        title={title}
        description={`${description && description.substring(0, 20)}...`}
      />
    </Card>
  );
};

export default ProductCard;
