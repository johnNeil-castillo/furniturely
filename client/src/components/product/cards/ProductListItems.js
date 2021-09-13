import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import { showAverage } from "../../../functions/rating";

const ProductListItems = ({ product }) => {
  const { price, category, subs, shipping, color, brand, quantity, sold } =
    product;

  return (
    <>
      <Row className="mb-3">
        <Col span={12}>Price</Col>
        <Col span={12}>
          <h6>$ {price}</h6>
        </Col>
      </Row>
      <Row className="mb-3">
        {category && (
          <>
            <Col span={12}>Category</Col>
            <Col span={12}>
              <Link to={`/category/${category.slug}`}>
                <h6>{category.name}</h6>
              </Link>
            </Col>
          </>
        )}
      </Row>
      <Row className="mb-3">
        {subs && (
          <>
            <Col span={12}>Sub Category</Col>
            {subs.map((s) => (
              <Col span={12}>
                <Link key={s._id} to={`/sub/${s.slug}`}>
                  <h6> {s.name}</h6>
                </Link>
              </Col>
            ))}
          </>
        )}
      </Row>
      <Row className="mb-3">
        <Col span={12}>Shipping</Col>
        <Col span={12}>
          <h6>{shipping}</h6>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col span={12}>Color</Col>
        <Col span={12}>
          <h6>{color}</h6>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col span={12}>Brand</Col>
        <Col span={12}>
          <h6>{brand}</h6>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col span={12}>Available</Col>
        <Col span={12}>
          <h6>{quantity}</h6>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col span={12}>Sold</Col>
        <Col span={12}>
          <h6>{sold}</h6>
        </Col>
      </Row>
      <Row>
        <Col span={12}>Rating</Col>
        <Col span={12}>
          <h6>
            {product && product.ratings && product.ratings.length > 0 ? (
              showAverage(product)
            ) : (
              <div>No rating yet</div>
            )}
          </h6>
        </Col>
      </Row>
    </>
  );
};

export default ProductListItems;
