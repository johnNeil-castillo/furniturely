import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { signInWithEmailLink, updatePassword } from "firebase/auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createOrUpdateUser } from "../../functions/auth";
import { Card } from "antd";
import LogoWithText from "../../images/Logo-with-text-01.svg";
import { Link } from "react-router-dom";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let dispatch = useDispatch();

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, [history]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Password is required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be atleast 6 characters long");
      return;
    }

    try {
      const result = await signInWithEmailLink(
        auth,
        email,
        window.location.href
      );

      if (result.user.emailVerified) {
        window.localStorage.removeItem("emailForRegistration");

        let user = auth.currentUser;
        await updatePassword(user, password);
        const idTokenResult = await user.getIdTokenResult();

        console.log("user", user, "idTokenResult", idTokenResult);

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
          })
          .catch((err) => {
            console.log(err);
            toast.error(err.message);
          });

        history.push("/");
      }

      console.log("RESULT", result);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const completeRegistrationForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <input type="email" className="form-control" value={email} disabled />
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
        <button
          style={{ backgroundColor: "#515af6", color: "white" }}
          className="btn btn-light d-grid gap-2 col-6 mx-auto"
          type="submit"
        >
          Complete Registration
        </button>
      </form>
    );
  };

  return (
    <div className="container p-3">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <Card bordered={false}>
            <h4 className="mb-3 text-center">
              <Link to="/">
                <img
                  style={{ height: "150px" }}
                  src={LogoWithText}
                  alt="sample"
                />
              </Link>
            </h4>
            <h5 style={{ color: "#515af6" }} className="mb-5 text-center">
              Register Complete
            </h5>

            {completeRegistrationForm()}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
