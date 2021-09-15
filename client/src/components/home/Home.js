import React from "react";

import NewArrivals from "./NewArrivals";
import BestSellers from "./BestSellers";
import CategoryList from "./CategoryList";
import SubList from "./SubList";
import { Carousel } from "antd";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Carousel className="container max-auto" autoplay>
        <div>
          <Link to="/category/sofa">
            <img
              className="container"
              src="https://res.cloudinary.com/dsg7j2b4z/image/upload/v1631639869/Sofa_flptco.jpg"
              alt=""
            />
          </Link>
        </div>
        <div>
          <Link to="/category/bed">
            <img
              className="container"
              src="https://res.cloudinary.com/dsg7j2b4z/image/upload/v1631639869/Bed_ouyy3a.jpg"
              alt=""
            />
          </Link>
        </div>
        <div>
          <Link to="/category/table">
            <img
              className="container"
              src="https://res.cloudinary.com/dsg7j2b4z/image/upload/v1631639869/Table_rgwhry.jpg"
              alt=""
            />
          </Link>
        </div>
        <div>
          <Link to="/category/chair">
            <img
              className="container"
              src="https://res.cloudinary.com/dsg7j2b4z/image/upload/v1631639869/Chair_nywk3w.jpg"
              alt=""
            />
          </Link>
        </div>
      </Carousel>

      <div className="container mb-5 mt-5">
        <p className="m-3">
          Shop by <b>Categories</b>
        </p>
        <CategoryList />
      </div>

      <div className="container mb-5">
        <p className="m-3">
          Shop by <b>Sub Categories</b>
        </p>
        <SubList />
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
    </>
  );
};

export default Home;
