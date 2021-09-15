import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

// protect routes
const UserRoute = lazy(() => import("./routes/UserRoute"));
const AdminRoute = lazy(() => import("./routes/AdminRoute"));

// Components
const Login = lazy(() => import("./components/auth/Login"));
const Register = lazy(() => import("./components/auth/Register"));
const Home = lazy(() => import("./components/home/Home"));
const Header = lazy(() => import("./components/nav/Header"));
const HeaderSmall = lazy(() => import("./components/nav/HeaderSmall"));
const SideDrawer = lazy(() => import("./components/drawer/SideDrawer"));
const RegisterComplete = lazy(() =>
  import("./components/auth/RegisterComplete")
);
const ForgotPassowrd = lazy(() => import("./components/auth/ForgotPassword"));
const History = lazy(() => import("./components/user/sideNav/History"));
const Password = lazy(() => import("./components/user/sideNav/Password"));
const Wishlist = lazy(() => import("./components/user/sideNav/Wishlist"));
const AdminDashboard = lazy(() =>
  import("./components/admin/sideNav/AdminDashboard")
);
const CategoryCreate = lazy(() =>
  import("./components/admin/sideNav/CategoryCreate")
);
const CategoryUpdate = lazy(() =>
  import("./components/admin/sideNav/CategoryUpdate.js")
);
const SubCreate = lazy(() => import("./components/admin/sideNav/SubCreate.js"));
const SubUpdate = lazy(() => import("./components/admin/sideNav/SubUpdate.js"));
const ProductCreate = lazy(() =>
  import("./components/admin/sideNav/ProductCreate")
);
const AllProducts = lazy(() =>
  import("./components/admin/sideNav/AllProducts")
);
const ProductUpdate = lazy(() =>
  import("./components/admin/sideNav/ProductUpdate")
);
const AdminPassword = lazy(() =>
  import("./components/admin/sideNav/AdminPassword")
);
const Product = lazy(() => import("./components/product/Product"));
const CategoryHome = lazy(() =>
  import("./components/home/redirect/CategoryHome")
);
const SubHome = lazy(() => import("./components/home/redirect/SubHome"));
const Shop = lazy(() => import("./components/shop/Shop"));
const Cart = lazy(() => import("./components/cart/Cart"));
const Checkout = lazy(() => import("./components/checkout/Checkout"));
const CreateCouponPage = lazy(() =>
  import("./components/admin/sideNav/CreateCouponPage")
);
const Payment = lazy(() => import("./components/checkout/stripe/Payment"));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Suspense
      fallback={
        <div className="col text-center p-5">
          <Spin />
        </div>
      }
    >
      <SideDrawer />
      <ToastContainer />
      <Switch>
        <Route
          path="/"
          exact
          render={(props) => {
            return (
              <>
                <Header /> <Home {...props} />
              </>
            );
          }}
        ></Route>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/register/complete" exact component={RegisterComplete} />
        <Route path="/forgot/password" exact component={ForgotPassowrd} />
        <Route
          path="/product/:slug"
          exact
          render={(props) => {
            return (
              <>
                <Header /> <Product {...props} />
              </>
            );
          }}
        ></Route>
        <Route
          path="/category/:slug"
          exact
          render={(props) => {
            return (
              <>
                <Header /> <CategoryHome {...props} />
              </>
            );
          }}
        />
        <Route
          path="/sub/:slug"
          exact
          render={(props) => {
            return (
              <>
                <Header /> <SubHome {...props} />
              </>
            );
          }}
        />
        <Route
          path="/shop"
          exact
          render={(props) => {
            return (
              <>
                <Header /> <Shop {...props} />
              </>
            );
          }}
        />
        <Route
          path="/cart"
          exact
          render={(props) => {
            return (
              <>
                <HeaderSmall /> <Cart {...props} />
              </>
            );
          }}
        />

        <UserRoute
          path="/user/history"
          exact
          render={(props) => {
            return (
              <>
                <HeaderSmall /> <History {...props} />
              </>
            );
          }}
        />
        <UserRoute
          path="/user/password"
          exact
          render={(props) => {
            return (
              <>
                <HeaderSmall /> <Password {...props} />
              </>
            );
          }}
        />
        <UserRoute
          path="/user/wishlist"
          exact
          render={(props) => {
            return (
              <>
                <HeaderSmall /> <Wishlist {...props} />
              </>
            );
          }}
        />
        <UserRoute
          path="/payment"
          exact
          render={(props) => {
            return (
              <>
                <HeaderSmall /> <Payment {...props} />
              </>
            );
          }}
        />
        <UserRoute
          path="/checkout"
          exact
          render={(props) => {
            return (
              <>
                <HeaderSmall /> <Checkout {...props} />
              </>
            );
          }}
        />

        <AdminRoute
          path="/admin/dashboard"
          exact
          render={(props) => {
            return (
              <>
                <HeaderSmall /> <AdminDashboard {...props} />
              </>
            );
          }}
        />
        <AdminRoute
          path="/admin/category"
          exact
          render={(props) => {
            return (
              <>
                <HeaderSmall /> <CategoryCreate {...props} />
              </>
            );
          }}
        />
        <AdminRoute
          path="/admin/category/:slug"
          exact
          render={(props) => {
            return (
              <>
                <HeaderSmall /> <CategoryUpdate {...props} />
              </>
            );
          }}
        />
        <AdminRoute
          path="/admin/sub"
          exact
          render={(props) => {
            return (
              <>
                <HeaderSmall /> <SubCreate {...props} />
              </>
            );
          }}
        />
        <AdminRoute
          path="/admin/sub/:slug"
          exact
          render={(props) => {
            return (
              <>
                <HeaderSmall /> <SubUpdate {...props} />
              </>
            );
          }}
        />
        <AdminRoute
          path="/admin/product"
          exact
          render={(props) => {
            return (
              <>
                <HeaderSmall /> <ProductCreate {...props} />
              </>
            );
          }}
        />
        <AdminRoute
          path="/admin/products"
          exact
          render={(props) => {
            return (
              <>
                <HeaderSmall /> <AllProducts {...props} />
              </>
            );
          }}
        />
        <AdminRoute
          path="/admin/product/:slug"
          exact
          render={(props) => {
            return (
              <>
                <HeaderSmall /> <ProductUpdate {...props} />
              </>
            );
          }}
        />
        <AdminRoute
          path="/admin/password"
          exact
          render={(props) => {
            return (
              <>
                <HeaderSmall /> <AdminPassword {...props} />
              </>
            );
          }}
        />
        <AdminRoute
          path="/admin/coupon"
          exact
          render={(props) => {
            return (
              <>
                <HeaderSmall /> <CreateCouponPage {...props} />
              </>
            );
          }}
        />
      </Switch>
    </Suspense>
  );
};

export default App;
