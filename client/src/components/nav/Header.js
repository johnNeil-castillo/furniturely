import { useState } from "react";

import { Menu, Badge, Layout, Col, Row, Card } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
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
      <Card>
        <Row align="top">
          <Col span={5}>
            <Link>Links</Link>
          </Col>

          <Col span={4} offset={13}>
            <>
              <Row>
                <Col offset={6}>
                  {!user && <Link to="/register">Register</Link>}
                </Col>
                <Col offset={6}>{!user && <Link to="/login">Login</Link>}</Col>
              </Row>
            </>

            {user && user.role === "subscriber" && (
              <>
                <Row>
                  <Link to="/user/history">Dashboard</Link>
                  <div onClick={logout}>Logout</div>
                </Row>
              </>
            )}
            {user && user.role === "admin" && (
              <>
                <Row>
                  <Col offset={6}>
                    <Link to="/admin/dashboard">Dashboard</Link>
                  </Col>
                  <Col offset={6}>
                    <a onClick={logout}>Logout</a>
                  </Col>
                </Row>
              </>
            )}
          </Col>
        </Row>
        <Row align="middle">
          <Col span={4}>
            <Card bordered={false} className="text-center">
              <Link className="fs-4" to="/">
                Logo
              </Link>
            </Card>
          </Col>
          <Col span={14} offset={1}>
            <Card bordered={false}>
              <Search />
            </Card>
          </Col>
          <Col span={1} className="text-center">
            <Card bordered={false}>
              <Link to="/shop">
                <ShoppingOutlined className="fs-5" />
              </Link>
            </Card>
          </Col>
          <Col span={2} className="text-center">
            <Card bordered={false}>
              <Link to="/cart">
                <ShoppingCartOutlined className="fs-5" />
              </Link>
              <Badge count={cart.length} offset={[0, -15]}></Badge>
            </Card>
          </Col>
          {user && (
            <Col span={1} className="text-center">
              <Card bordered={false}>
                <Link to="/user/wishlist">
                  <HeartOutlined className="fs-5" />
                </Link>
              </Card>
            </Col>
          )}
        </Row>
      </Card>
    </>
  );
};

export default Header;
