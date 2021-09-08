import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";

// protect routes
const UserRoute = lazy(() => import("./components/routes/UserRoute"));
const AdminRoute = lazy(() => import("./components/routes/AdminRoute"));

// Components
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Home = lazy(() => import("./pages/Home"));
const Header = lazy(() => import("./components/nav/Header"));
const SideDrawer = lazy(() => import("./components/drawer/SideDrawer"));
const RegisterComplete = lazy(() => import("./pages/auth/RegisterComplete"));
const ForgotPassowrd = lazy(() => import("./pages/auth/ForgotPassword"));
const History = lazy(() => import("./pages/user/History"));
const Password = lazy(() => import("./pages/user/Password"));
const Wishlist = lazy(() => import("./pages/user/Wishlist"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const CategoryCreate = lazy(() =>
  import("./pages/admin/category/CategoryCreate")
);
const CategoryUpdate = lazy(() =>
  import("./pages/admin/category/CategoryUpdate")
);
const SubCreate = lazy(() => import("./pages/admin/sub/SubCreate"));
const SubUpdate = lazy(() => import("./pages/admin/sub/SubUpdate"));
const ProductCreate = lazy(() => import("./pages/admin/product/ProductCreate"));
const AllProducts = lazy(() => import("./pages/admin/product/AllProducts"));
const ProductUpdate = lazy(() => import("./pages/admin/product/ProductUpdate"));
const Product = lazy(() => import("./pages/Product"));
const CategoryHome = lazy(() => import("./pages/category/CategoryHome"));
const SubHome = lazy(() => import("./pages/sub/SubHome"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const CreateCouponPage = lazy(() =>
  import("./pages/admin/coupon/CreateCouponPage")
);
const Payment = lazy(() => import("./pages/Payment"));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log("user", user);

        currentUser(idTokenResult.token)
          .then((res) => {
            console.log(res);
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                email: res.email,
                name: res.name,
                token: idTokenResult.token,
                role: res.role,
                _id: res._id,
              },
            });
          })
          .catch((err) => {
            console.log(err);
            toast.error(err.message);
          });
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
