import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrUpdateUser } from "../../functions/auth";
import { Card, Spin } from "antd";
import LogoWithText from "../../images/Logo-with-text-01.svg";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  let dispatch = useDispatch();

  const roleBasedRedirect = (res) => {
    let intended = history.location.state;

    if (intended) {
      history.push(intended.from);
    } else {
      if (res.data.role === "admin") {
        history.push("/admin/dashboard");
      } else {
        history.push("/");
      }
    }
  };

  useEffect(() => {
    let intended = history.location.state;

    if (intended) {
      return;
    } else {
      if (user && user.token) {
        history.push("/");
      }
    }
  }, [user, history]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      createOrUpdateUser(idTokenResult.token)
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
          roleBasedRedirect(res);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message);
        });
    } catch (error) {
      console.log(error);
      toast.error("Check your Email and Password");
      setLoading(false);
    }
  };
  const googleLogin = async () => {
    signInWithPopup(auth, googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();

        createOrUpdateUser(idTokenResult.token)
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
            roleBasedRedirect(res);
          })
          .catch();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
          placeholder="Enter Email"
        />
        <br />

        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          placeholder="Enter Password"
        />
        <br />
        <Button
          style={{ backgroundColor: "#515af6", color: "white" }}
          onClick={handleSubmit}
          type="primary"
          className="mb-3"
          block
          size="large"
          disabled={!email || password.length < 6}
        >
          Login with Email/Password
        </Button>
      </form>
    );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 ">
          <Card bordered={false} className="p-3">
            {loading ? (
              <h4 className="text-center ">
                <Spin />
              </h4>
            ) : (
              <>
                <h4 className="text-center mb-1">
                  <Link to="/">
                    <img
                      style={{ height: "150px" }}
                      src={LogoWithText}
                      alt="sample"
                    />
                  </Link>
                </h4>
                <h5 className="text-center mb-4" style={{ color: "#515af6" }}>
                  Login
                </h5>

                {loginForm()}

                <Button
                  onClick={googleLogin}
                  type="danger"
                  className="mb-3"
                  block
                  size="large"
                >
                  Login with Google
                </Button>
                <Link to="/register" className="float-start text-danger mt-4">
                  Create Account
                </Link>
                <Link
                  to="/forgot/password"
                  className="float-end text-danger mt-4"
                >
                  Forgot Password
                </Link>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
