import React from "react";

import NewArrivals from "./NewArrivals";
import BestSellers from "./BestSellers";
import CategoryList from "./CategoryList";
import SubList from "./SubList";
import { Carousel, Row, Col } from "antd";

const Home = () => {
  return (
    <>
      <Carousel autoplay>
        <div>
          <h3
            style={{
              height: "500px",
              color: "#fff",
              lineHeight: "160px",
              textAlign: "center",
              background: "#364d79",
            }}
          >
            asdasd
          </h3>
        </div>
        <div>
          <h3
            style={{
              height: "500px",
              color: "#fff",
              lineHeight: "160px",
              textAlign: "center",
              background: "#364d79",
            }}
          >
            asdasd
          </h3>
        </div>
      </Carousel>

      <div className="container mb-5">
        <p className="m-3">
          Shop by <b>Categories</b>
        </p>
        <CategoryList />
      </div>

      <div className="container">
        <p className="m-3">
          Check our <b>New Arrivals</b>
        </p>
        <NewArrivals />
      </div>

      <div className="container ">
        <p className="m-3">
          Buy our <b>Best Sellers</b>
        </p>
        <BestSellers />
      </div>

      <div className="container mb-5">
        <p className="m-3">
          Shop by <b>Sub Categories</b>
        </p>
        <SubList />
      </div>
    </>
  );
};

export default Home;
