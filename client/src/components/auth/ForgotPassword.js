import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { sendPasswordResetEmail } from "firebase/auth";
import { Card, Spin } from "antd";
import { Link } from "react-router-dom";

const ForgotPassowrd = ({ history }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const actionCodeSettings = {
      url: process.env.REACT_APP_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };

    await sendPasswordResetEmail(auth, email, actionCodeSettings)
      .then(() => {
        setEmail("");
        setLoading(false);
        toast.success("Check your email for password reset link");
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Can't find your email");
        console.log("Error message in forgot password", error);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 mt-5 pt-3">
          <Card bordered={false} className="p-3">
            {loading ? (
              <h4 className="text-danger">
                <Spin />
              </h4>
            ) : (
              <>
                <h4 className="text-center mb-3">
                  <Link to="/">Logo</Link>
                </h4>
                <h5 className="text-center mb-5">Forgot Password</h5>{" "}
                <form onSubmit={handleSubmit}>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Type your email"
                    autoFocus
                  />
                  <br />
                  <button
                    className="btn btn-light d-grid gap-2 col-6 mx-auto"
                    disabled={!email}
                  >
                    Submit
                  </button>
                  <Link to="/register" className="float-start text-danger mt-4">
                    Create Account
                  </Link>
                  <Link to="/login" className="float-end text-danger mt-4">
                    Sign In Here!
                  </Link>
                </form>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassowrd;
