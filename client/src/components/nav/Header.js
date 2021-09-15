import { useState } from "react";

import { Badge, Col, Row, Card, Divider } from "antd";
import {
  ShoppingOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  BehanceOutlined,
  LinkedinFilled,
  GithubOutlined,
  ExportOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Search from "./Search";
import Logo from "../../images/Logo-with-text-01.svg";

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
        <Row align="top" gutter={[0, 16]}>
          <Col
            className="text-center"
            lg={4}
            md={6}
            xs={24}
            style={{ color: "#515af6" }}
          >
            <a
              className="mx-3 fs-6"
              href="https://github.com/johnNeil-castillo"
              target="_blank"
            >
              <GithubOutlined />
            </a>
            <a
              className="mx-3 fs-6"
              href="https://www.linkedin.com/in/john-neil-castillo-981895157/"
              target="_blank"
            >
              <LinkedinFilled />
            </a>
            <a
              className="mx-3 fs-6"
              href="https://www.behance.net/NeilCastillo/"
              target="_blank"
            >
              <BehanceOutlined />
            </a>
          </Col>
          <Col
            lg={{ offset: 7 }}
            md={{ offset: 4 }}
            sm={{ offset: 9 }}
            xs={{ offset: 8 }}
          >
            <Link to="/">
              <img
                style={{
                  height: "90px",
                }}
                src={Logo}
                alt=""
              />
            </Link>
          </Col>
          {!user && (
            <Col offset={16}>
              <Link style={{ color: "#515af6" }} to="/register">
                Register
              </Link>
            </Col>
          )}
          {!user && (
            <Col offset={1}>
              <Link style={{ color: "#515af6" }} to="/login">
                Login
              </Link>{" "}
            </Col>
          )}

          {user && user.role === "subscriber" && (
            <>
              <Col
                lg={{ offset: 6, span: 1 }}
                md={{ offset: 6, span: 1 }}
                sm={{ offset: 9, span: 4 }}
                xs={{ offset: 2 }}
              >
                <Link style={{ color: "#515af6" }} to="/user/history">
                  <IdcardOutlined />
                </Link>
              </Col>
            </>
          )}

          {user && user.role === "subscriber" && (
            <>
              <Col offset={1}>
                <a
                  style={{ color: "#515af6" }}
                  className="primary"
                  onClick={logout}
                >
                  <ExportOutlined />
                </a>
              </Col>
            </>
          )}

          {user && user.role === "admin" && (
            <>
              <Col
                lg={{ offset: 6, span: 1 }}
                md={{ offset: 6, span: 1 }}
                sm={{ offset: 9, span: 4 }}
                xs={{ offset: 2 }}
              >
                <Link
                  className="fs-4"
                  style={{ color: "#515af6" }}
                  to="/admin/dashboard"
                >
                  <IdcardOutlined />
                </Link>
              </Col>
            </>
          )}

          {user && user.role === "admin" && (
            <>
              <Col offset={1}>
                <a
                  style={{ color: "#515af6" }}
                  onClick={logout}
                  className="primary fs-4"
                >
                  <ExportOutlined />
                </a>
              </Col>
            </>
          )}
        </Row>
        <Row align="middle">
          <Col span={14} offset={1} xs={{ span: 22 }}>
            <Card bordered={false}>
              <Search />
            </Card>
          </Col>
          <Col span={1} xs={{ span: 8 }} className="text-center">
            <Link to="/shop">
              <ShoppingOutlined style={{ color: "#515af6" }} className="fs-5" />
            </Link>
          </Col>
          <Col span={1} className="text-center" xs={{ span: 8 }}>
            <Link to="/cart">
              <ShoppingCartOutlined
                style={{ color: "#515af6" }}
                className="fs-5"
              />
            </Link>
            <Badge count={cart.length} offset={[0, -15]}></Badge>
          </Col>
          {user && (
            <Col span={1} className="text-center" xs={{ span: 8 }}>
              <Link to="/user/wishlist">
                <HeartOutlined style={{ color: "#515af6" }} className="fs-5" />
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
