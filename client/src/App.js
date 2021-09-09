import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";
import { LoadingOutlined } from "@ant-design/icons";

// protect routes
const UserRoute = lazy(() => import("./routes/UserRoute"));
const AdminRoute = lazy(() => import("./routes/AdminRoute"));

// Components
const Login = lazy(() => import("./components/auth/Login"));
const Register = lazy(() => import("./components/auth/Register"));
const Home = lazy(() => import("./components/home/Home"));
const Header = lazy(() => import("./components/nav/Header"));
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
          __ Furniturely <LoadingOutlined /> __
        </div>
      }
    >
      <Header />
      <SideDrawer />
      <ToastContainer />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/register/complete" exact component={RegisterComplete} />
        <Route path="/forgot/password" exact component={ForgotPassowrd} />
        <UserRoute path="/user/history" exact component={History} />
        <UserRoute path="/user/password" exact component={Password} />
        <UserRoute path="/user/wishlist" exact component={Wishlist} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/admin/category" exact component={CategoryCreate} />
        <AdminRoute
          path="/admin/category/:slug"
          exact
          component={CategoryUpdate}
        />
        <AdminRoute path="/admin/sub" exact component={SubCreate} />
        <AdminRoute path="/admin/sub/:slug" exact component={SubUpdate} />
        <AdminRoute path="/admin/product" exact component={ProductCreate} />
        <AdminRoute path="/admin/products" exact component={AllProducts} />
        <AdminRoute
          path="/admin/product/:slug"
          exact
          component={ProductUpdate}
        />
        <AdminRoute path="/admin/password" exact component={AdminPassword} />
        <Route path="/product/:slug" exact component={Product} />
        <Route path="/category/:slug" exact component={CategoryHome} />
        <Route path="/sub/:slug" exact component={SubHome} />
        <Route path="/shop" exact component={Shop} />
        <Route path="/cart" exact component={Cart} />

        <UserRoute path="/checkout" exact component={Checkout} />
        <AdminRoute path="/admin/coupon" exact component={CreateCouponPage} />
        <UserRoute path="/payment" exact component={Payment} />
      </Switch>
    </Suspense>
  );
};

export default App;
