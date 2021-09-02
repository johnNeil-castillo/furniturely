import React from "react";
import { getProducts } from "../functions/product";
import ProductCard from "../components/cards/ProductCard";
import LoadingCard from "../components/cards/LoadingCard";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";

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
    </>
  );
};

export default Home;
