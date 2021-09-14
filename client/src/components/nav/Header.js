import { useState } from "react";

import { Badge, Col, Row, Card } from "antd";
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
      <Card bodyStyle={{ background: "#fefae0" }} bordered={false}>
        <Row align="top" className="container">
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
                <a onClick={logout}>Logout</a>
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
                <a onClick={logout}>Logout</a>
              </Col>
            </>
          )}
        </Row>

        <Row align="middle">
          <Col span={4}>
            <Card
              bodyStyle={{ background: "#fefae0" }}
              bordered={false}
              className="text-center"
            >
              <Link className="fs-4" to="/">
                Logo
              </Link>
            </Card>
          </Col>
          <Col span={14} offset={1}>
            <Card bodyStyle={{ background: "#fefae0" }} bordered={false}>
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
      </Card>
    </>
  );
};

export default Header;
