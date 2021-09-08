import React from "react";

import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubList from "../components/sub/SubList";

const Home = () => {
  return (
    <>
      <div>
        <h4>All Products</h4>
      </div>

      <h4 className="text-center p-3 mt-5 mb-5 display-5 ">New Arrivals</h4>
      <NewArrivals />

      <h4 className="text-center p-3 mt-5 mb-5 display-5 ">Best Sellers</h4>
      <BestSellers />

      <h4 className="text-center p-3 mt-5 mb-5 display-5 ">Categories</h4>
      <CategoryList />

      <h4 className="text-center p-3 mt-5 mb-5 display-5 ">Sub Categories</h4>
      <SubList />
    </>
  );
};

export default Home;
