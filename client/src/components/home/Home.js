import React from "react";

import NewArrivals from "./NewArrivals";
import BestSellers from "./BestSellers";
import CategoryList from "./CategoryList";
import SubList from "./SubList";

const Home = () => {
  return (
    <>
      <div className="text-center">
        <h4>All Products</h4>
      </div>

      <div className="container mb-5">
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
