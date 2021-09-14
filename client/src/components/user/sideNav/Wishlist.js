import React, { useState, useEffect } from "react";
import UserNav from "../UserNav";
import { getWishlist, removeWishlist } from "../../../functions/user";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import { Card } from "antd";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    const loadSingleWishlist = () =>
      getWishlist(user.token).then((res) => {
        setWishlist(res.data.wishlist);
      });
    loadSingleWishlist();
  }, [user.token]);

  // Move to new Component
  const loadWishlist = () =>
    getWishlist(user.token).then((res) => {
      setWishlist(res.data.wishlist);
    });

  const handleRemove = (productId) =>
    removeWishlist(productId, user.token).then((res) => {
      loadWishlist();
    });

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">
          <h4 className="text-center my-4">Wishlist</h4>

          {wishlist.map((p) => (
            <Card key={p._id}>
              <Link to={`/product/${p.slug}`}>{p.title}</Link>
              <span
                onClick={() => handleRemove(p._id)}
                className="btn btn-sm float-end"
              >
                <DeleteOutlined className="text-danger" />
              </span>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
