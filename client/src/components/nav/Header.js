import { useState } from "react";

import { Badge, Col, Row, Card, Divider } from "antd";
import {
  ShoppingOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Search from "./Search";
import Logo from "../../images/Logo-01.svg";

const Header = () => {
  const [current, setCurrent] = useState("home");

  let dispatch = useDispatch();

  let { user, cart } = useSelector((state) => ({ ...state }));
  let history = useHistory();

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    signOut(auth);
    dispatch({ type: "LOGOUT", payload: null });
    history.push("/login");
  };

  return (
    <>
      <Card className="container mx-auto" bordered={false}>
        <Row align="top">
          <Col className="text-center" span={4}>
            <Link>Links</Link>
          </Col>
          {!user && (
            <Col offset={16}>
              <Link to="/register">Register</Link>
            </Col>
          )}
          {!user && (
            <Col offset={1}>
              <Link to="/login">Login</Link>{" "}
            </Col>
          )}

          {user && user.role === "subscriber" && (
            <>
              <Col offset={16}>
                <Link to="/user/history">Dashboard</Link>
              </Col>
            </>
          )}

          {user && user.role === "subscriber" && (
            <>
              <Col offset={1}>
                <a className="primary" onClick={logout}>
                  Logout
                </a>
              </Col>
            </>
          )}

          {user && user.role === "admin" && (
            <>
              <Col offset={16}>
                <Link to="/admin/dashboard">Dashboard</Link>
              </Col>
            </>
          )}

          {user && user.role === "admin" && (
            <>
              <Col offset={1}>
                <a onClick={logout} className="primary">
                  Logout
                </a>
              </Col>
            </>
          )}
        </Row>
        <Row align="middle">
          <Col span={4}>
            <Card bordered={false} className="text-center">
              <Link className="fs-4" to="/">
                <img style={{ height: "90px" }} src={Logo} alt="" />
              </Link>
            </Card>
          </Col>
          <Col span={14} offset={1}>
            <Card bordered={false}>
              <Search />
            </Card>
          </Col>
          <Col span={1} className="text-center">
            <Link to="/shop">
              <ShoppingOutlined className="fs-5" />
            </Link>
          </Col>
          <Col span={2} className="text-center">
            <Link to="/cart">
              <ShoppingCartOutlined className="fs-5" />
            </Link>
            <Badge count={cart.length} offset={[0, -15]}></Badge>
          </Col>
          {user && (
            <Col span={1} className="text-center">
              <Link to="/user/wishlist">
                <HeartOutlined className="fs-5" />
              </Link>
            </Col>
          )}
        </Row>
        <Divider />
      </Card>
    </>
  );
};

export default Header;
