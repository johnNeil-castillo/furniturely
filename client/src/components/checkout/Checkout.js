import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  applyCoupon,
  createCashOrderForUser,
} from "../../functions/user";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Card, Input } from "antd";

const Checkout = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState("");

  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  const dispatch = useDispatch();
  const { user, COD } = useSelector((state) => ({ ...state }));
  const couponTrueOrFalse = useSelector((state) => state.coupon);

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log("user cart res", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, [user.token]);

  const emptyCart = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }

    dispatch({ type: "ADD_TO_CART", payload: [] });

    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setCoupon("");
      toast.success("Cart is empty. Continue Shopping");
    });
  };

  const saveAddressToDb = () => {
    saveUserAddress(user.token, address).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("Address Saved");
      }
    });
  };

  const applyDiscountCoupon = () => {
    console.log("send coupon to back", coupon);
    applyCoupon(user.token, coupon).then((res) => {
      console.log("res on coupon applied", res.data);
      if (res.data) {
        setTotalAfterDiscount(res.data);
        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });
      }

      if (res.data.err) {
        setDiscountError(res.data.err);
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
      }
    });
  };

  const showAddress = () => (
    <>
      <ReactQuill
        style={{ height: "100px" }}
        theme="snow"
        value={address}
        onChange={setAddress}
        className="mb-2 "
      />
      <button className="btn btn-primary mt-5" onClick={saveAddressToDb}>
        Save
      </button>
    </>
  );

  const showProductSummary = () => {
    return products.map((p, i) => (
      <div key={i} className="mt-4">
        <p>
          {p.product.title} ({p.color}) x {p.count} ={" "}
          {p.product.price * p.count}
        </p>
      </div>
    ));
  };

  const showApplyCoupon = () => {
    return (
      <>
        <Input
          type="text"
          className="form-control "
          onChange={(e) => {
            setCoupon(e.target.value);
            setDiscountError("");
          }}
          value={coupon}
        />
        <button onClick={applyDiscountCoupon} className="btn btn-primary mt-3">
          Apply
        </button>
      </>
    );
  };

  const createCashOrder = () => {
    createCashOrderForUser(user.token, COD, couponTrueOrFalse).then((res) => {
      console.log("user cash order created res", res);
      if (typeof window !== "undefined") localStorage.removeItem("cart");

      if (res.data.ok) {
        dispatch({ type: "ADD_TO_CART", payload: [] });
      }

      if (res.data.ok) {
        dispatch({ type: "COUPON_APPLIED", payload: false });
      }

      if (res.data.ok) {
        dispatch({ type: "COD", payload: false });
      }
      emptyUserCart(user.token);

      setTimeout(() => {
        history.push("/user/history");
      }, 1000);
    });
  };

  return (
    <div className="row container-fluid">
      <div className="col-md-7 mt-3">
        <Card bordered={false}>
          <h4 className="mb-3">Delivery Address</h4>

          {showAddress()}
        </Card>

        <Card bordered={false}>
          <h4 className="mb-3">Got Coupon?</h4>

          {showApplyCoupon()}
          <br />
          {discountError && <p className="text-danger mt-2">{discountError}</p>}
        </Card>
      </div>

      <div className="col-md-5 mt-5">
        <Card>
          <h4>Order Summary</h4>
          <hr />
          <b>
            Total Product{products.length > 1 ? "s" : ""}: {products.length}
          </b>

          {showProductSummary()}
          <hr />
          <h5>Cart Total: $ {total}</h5>
          {totalAfterDiscount > 0 && (
            <h5 className="bg-success p-2 text-center">
              Discount Applied: Total Payable: ${totalAfterDiscount}
            </h5>
          )}
          <div className="row text-center container-fluid">
            <div className="col-md-6">
              {COD ? (
                <button
                  className="btn btn-primary"
                  disabled={!addressSaved || !products.length}
                  onClick={createCashOrder}
                >
                  Place Order
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  disabled={!addressSaved || !products.length}
                  onClick={() => history.push("/payment")}
                >
                  Place Order
                </button>
              )}
            </div>

            <div className="col-md-6">
              <button
                disabled={!products.length}
                onClick={emptyCart}
                className="btn btn-primary"
              >
                Empty Cart
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;
