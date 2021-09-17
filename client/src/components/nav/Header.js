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
  SelectOutlined,
  UserAddOutlined,
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
        <Row align="top" gutter={[0, 16]} justify="center">
          <Col
            className="mt-1"
            lg={{ pull: 7 }}
            md={{ pull: 5 }}
            sm={{ pull: 5 }}
            xs={{ pull: 4 }}
          >
            <a
              className="fs-6"
              href="https://github.com/johnNeil-castillo"
              target="_blank"
            >
              <GithubOutlined style={{ color: "#515af6" }} />
            </a>
          </Col>
          <Col
            className="mt-1"
            lg={{ pull: 6 }}
            md={{ pull: 4 }}
            sm={{ pull: 4 }}
            xs={{ pull: 3 }}
          >
            <a
              className=" fs-6"
              href="https://www.linkedin.com/in/john-neil-castillo-981895157/"
              target="_blank"
            >
              <LinkedinFilled style={{ color: "#515af6" }} />
            </a>
          </Col>
          <Col
            className="mt-1"
            lg={{ pull: 5 }}
            md={{ pull: 3 }}
            sm={{ pull: 3 }}
            xs={{ pull: 2 }}
          >
            <a
              className="fs-6"
              href="https://www.behance.net/NeilCastillo/"
              target="_blank"
            >
              <BehanceOutlined style={{ color: "#515af6" }} />
            </a>
          </Col>

          <Col>
            <Link to="/">
              <img
                style={{
                  height: "90px",
                  marginLeft: "15px",
                }}
                src={Logo}
                alt=""
              />
            </Link>
          </Col>
          {!user && (
            <Col
              lg={{ push: 6 }}
              md={{ push: 4 }}
              sm={{ push: 4 }}
              xs={{ push: 3 }}
            >
              <Link
                className="fs-4"
                style={{ color: "#515af6" }}
                to="/register"
              >
                <UserAddOutlined />{" "}
                <p style={{ fontSize: "12px", marginLeft: "-8px" }}>Register</p>
              </Link>
            </Col>
          )}

          {!user && (
            <Col
              lg={{ push: 7 }}
              md={{ push: 5 }}
              sm={{ push: 5 }}
              xs={{ push: 4 }}
            >
              <Link className="fs-4" style={{ color: "#515af6" }} to="/login">
                <SelectOutlined />{" "}
                <p style={{ fontSize: "12px", marginLeft: "-4px" }}>Login</p>
              </Link>
            </Col>
          )}

          {user && user.role === "subscriber" && (
            <>
              <Col
                lg={{ push: 6 }}
                md={{ push: 4 }}
                sm={{ push: 4 }}
                xs={{ push: 3 }}
              >
                <Link
                  className="fs-4"
                  style={{ color: "#515af6" }}
                  to="/user/history"
                >
                  <IdcardOutlined />
                  <p style={{ fontSize: "12px" }}>User</p>
                </Link>
              </Col>
            </>
          )}

          {user && user.role === "subscriber" && (
            <>
              <Col
                lg={{ push: 7 }}
                md={{ push: 5 }}
                sm={{ push: 5 }}
                xs={{ push: 4 }}
              >
                <a
                  className="fs-4"
                  style={{ color: "#515af6" }}
                  onClick={logout}
                >
                  <ExportOutlined />{" "}
                  <p style={{ fontSize: "12px", marginLeft: "-4px" }}>Logout</p>
                </a>
              </Col>
            </>
          )}

          {user && user.role === "admin" && (
            <>
              <Col
                lg={{ push: 6 }}
                md={{ push: 4 }}
                sm={{ push: 4 }}
                xs={{ push: 3 }}
              >
                <Link
                  className="fs-4"
                  style={{ color: "#515af6" }}
                  to="/admin/dashboard"
                >
                  <IdcardOutlined />
                  <p style={{ fontSize: "12px", marginLeft: "-4px" }}>Admin</p>
                </Link>
              </Col>
            </>
          )}

          {user && user.role === "admin" && (
            <>
              <Col
                lg={{ push: 7 }}
                md={{ push: 5 }}
                sm={{ push: 5 }}
                xs={{ push: 4 }}
              >
                <a
                  style={{ color: "#515af6" }}
                  onClick={logout}
                  className=" fs-4"
                >
                  <ExportOutlined />
                  <p
                    style={{
                      fontSize: "12px",
                      marginLeft: "-5px",
                    }}
                  >
                    Logout
                  </p>
                </a>
              </Col>
            </>
          )}
        </Row>
        <Row align="middle" justify="center">
          <Col span={16} xs={{ span: 22 }}>
            <Card bordered={false}>
              <Search />
            </Card>
          </Col>
        </Row>
        <Row justify="center">
          <Col span={1} xs={{ span: 8 }} className="text-center">
            <Link style={{ color: "#515af6" }} to="/shop">
              <ShoppingOutlined className="fs-5" />
              <p style={{ fontSize: "12px" }}>Shop</p>
            </Link>
          </Col>
          {user && (
            <Col span={1} className="text-center" xs={{ span: 8 }}>
              <Link
                style={{ color: "#515af6" }}
                to="/user/wishlist"
                className="my-4"
              >
                <HeartOutlined className="fs-5" />
                <p style={{ fontSize: "12px" }}>Wishlist</p>
              </Link>
            </Col>
          )}
          <Col span={1} className="text-center" xs={{ span: 8 }}>
            <Link style={{ color: "#515af6" }} to="/cart">
              <ShoppingCartOutlined className="fs-5" />
              <p style={{ fontSize: "12px" }}>Cart</p>
            </Link>
            <Badge count={cart.length} offset={[15, -70]}></Badge>
          </Col>
          <Divider style={{ marginTop: "-10px" }} />
        </Row>
      </Card>
    </>
  );
};

export default Header;
