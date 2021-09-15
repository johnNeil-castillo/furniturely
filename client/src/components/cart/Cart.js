import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCardInCheckout from "./ProductCardInCheckout";
import { userCart } from "../../functions/user";
import { Card, Divider } from "antd";

const Cart = ({ history }) => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const showCartItems = () => {
    return (
      <table className="table mt-3 ">
        <thead className="thead-light text-center">
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Brand</th>
            <th scope="col">Color</th>
            <th scope="col">Count</th>
            <th scope="col">Shipping</th>
            <th scope="col">Remove</th>
          </tr>
        </thead>

        {cart.map((p) => (
          <ProductCardInCheckout key={p._id} p={p} />
        ))}
      </table>
    );
  };

  const saveOrderToDb = () => {
    userCart(cart, user.token)
      .then((res) => {
        console.log("Cart post res", res);
        if (res.data.ok) {
          history.push("/checkout");
        }
      })
      .catch((err) => console.log("cart save err", err));
  };

  const saveCashOrderToDb = () => {
    dispatch({
      type: "COD",
      payload: true,
    });

    userCart(cart, user.token)
      .then((res) => {
        console.log("Cart post res", res);
        if (res.data.ok) {
          history.push("/checkout");
        }
      })
      .catch((err) => console.log("cart save err", err));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 mt-4 text-center">
          <Card className="pt-2">
            <h4>
              Added {cart.length} Product{cart.length > 1 ? "s" : ""} To Cart
            </h4>
          </Card>

          {!cart.length ? (
            <h5 className="mt-5">
              No products in cart. <Link to="/shop">Continue Shopping</Link>
            </h5>
          ) : (
            showCartItems()
          )}
        </div>
        <div className="col-md-4 mt-4 ">
          <Card>
            <h4>Order Summary</h4>
            <Divider />
            <p>Products</p>
            {cart.map((c, i) => (
              <div key={i}>
                <p>
                  {c.title} x {c.count} = ${c.price * c.count}
                </p>
              </div>
            ))}
            <Divider />
            Total: <b>${getTotal()}</b>
            <Divider />
            {user ? (
              <>
                <button
                  onClick={saveOrderToDb}
                  className="btn btn-sm  mt-2"
                  disabled={!cart.length}
                  style={{ backgroundColor: "#515af6", color: "white" }}
                >
                  Proceed to Checkout
                </button>

                <button
                  onClick={saveCashOrderToDb}
                  className="btn btn-sm mt-2 float-end"
                  disabled={!cart.length}
                  style={{ backgroundColor: "#bc72ad", color: "white" }}
                >
                  Pay Cash on Delivery
                </button>
              </>
            ) : (
              <Link to={{ pathname: "/login", state: { from: "cart" } }}>
                <button
                  className="btn btn-sm btn-primary mt-2"
                  style={{ backgroundColor: "#515af6", color: "white" }}
                >
                  Login to Checkout
                </button>
              </Link>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;
