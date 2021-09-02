import React from "react";
import { Card, Tabs } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Product from "../../pages/Product";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import sampleImage from "../../images/SampleImage.png";
import ProductListItems from "./ProductListItems";

const { TabPane } = Tabs;

const SingleProduct = ({ product }) => {
  const { title, images, description } = product;
  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} infiniteLoop>
            {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
          </Carousel>
        ) : (
          <Card
            cover={<img src={sampleImage} className="mb-2 card-image" />}
          ></Card>
        )}

        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call us on to learn more about this product
          </TabPane>
        </Tabs>
      </div>

      <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>
        <Card
          actions={[
            <>
              <ShoppingCartOutlined className="text-success" />
              <br />
              Add to Cart
            </>,
            <Link to="/">
              <HeartOutlined className="text-info" />
              <br />
              Add to WishList
            </Link>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
