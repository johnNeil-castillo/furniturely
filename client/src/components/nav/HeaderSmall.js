import { useState } from "react";

import { Divider, Col, Row, Card, Badge } from "antd";
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
import Logo from "../../images/Logo-with-text-01.svg";

const HeaderSmall = () => {
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
            xs={{ pull: 5 }}
            style={{ color: "#515af6" }}
          >
            <a
              className="fs-6"
              href="https://github.com/johnNeil-castillo"
              target="_blank"
            >
              <GithubOutlined />
            </a>
          </Col>
          <Col
            className="mt-1"
            lg={{ pull: 6 }}
            md={{ pull: 4 }}
            sm={{ pull: 4 }}
            xs={{ pull: 4 }}
            style={{ color: "#515af6" }}
          >
            <a
              className=" fs-6"
              href="https://www.linkedin.com/in/john-neil-castillo-981895157/"
              target="_blank"
            >
              <LinkedinFilled />
            </a>
          </Col>
          <Col
            className="mt-1"
            lg={{ pull: 5 }}
            md={{ pull: 3 }}
            sm={{ pull: 3 }}
            xs={{ pull: 3 }}
            style={{ color: "#515af6" }}
          >
            <a
              className="fs-6"
              href="https://www.behance.net/NeilCastillo/"
              target="_blank"
            >
              <BehanceOutlined />
            </a>
          </Col>

          <Col>
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
                <UserAddOutlined />
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
                <SelectOutlined />
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
                  <ExportOutlined />
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
                </a>
              </Col>
            </>
          )}
        </Row>
        <Row justify="center" className="mt-4">
          <Col span={1} xs={{ span: 8 }} className="text-center">
            <Link to="/shop">
              <ShoppingOutlined style={{ color: "#515af6" }} className="fs-5" />
            </Link>
          </Col>
          {user && (
            <Col span={1} className="text-center" xs={{ span: 8 }}>
              <Link to="/user/wishlist" className="my-4">
                <HeartOutlined style={{ color: "#515af6" }} className="fs-5" />
              </Link>
            </Col>
          )}
          <Col span={1} className="text-center" xs={{ span: 8 }}>
            <Link to="/cart">
              <ShoppingCartOutlined
                style={{ color: "#515af6" }}
                className="fs-5"
              />
            </Link>
            <Badge count={cart.length} offset={[0, -15]}></Badge>
          </Col>
        </Row>
        <Divider />
      </Card>
    </>
  );
};

export default HeaderSmall;
