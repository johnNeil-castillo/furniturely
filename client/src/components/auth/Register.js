import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { sendSignInLinkToEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Card, Spin } from "antd";
import { Link } from "react-router-dom";

const Register = ({ history }) => {
  const [email, setEmail] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required");
      return;
    }

    const actionCodeSettings = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await sendSignInLinkToEmail(auth, email, actionCodeSettings);

    window.localStorage.setItem("emailForRegistration", email);

    toast.success(
      `Email is sent to ${email}. Click the link to complete your registration`
    );

    setEmail("");
  };

  const registerForm = () => {
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
        <button
          className="btn btn-light d-grid gap-2 col-6 mx-auto"
          type="submit"
        >
          Register
        </button>
      </form>
    );
  };

  return (
    <div className="container ">
      <div className="row">
        <div className="col-md-6 offset-md-3 mt-5 pt-3">
          <Card bordered={false} className="p-3">
            <h4 className="mb-3 text-center">
              <Link to="/">Logo</Link>
            </h4>
            <h5 className="mb-5 text-center">Register</h5>
            {registerForm()}
            <Link to="/login">
              <Card.Meta
                className="mt-4 text-center"
                description="Already have an account? Click here!"
              />
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;
