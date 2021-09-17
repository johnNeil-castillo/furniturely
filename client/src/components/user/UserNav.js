import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  IdcardOutlined,
  HeartOutlined,
  SafetyOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Row, Col } from "antd";

const UserNav = () => {
  let { user } = useSelector((state) => ({ ...state }));
  return (
    <>
      <Row justify="center">
        <Col xs={5} md={3}>
          <Link
            style={{ color: "#515af6" }}
            className="fs-4 text-center"
            to="/user/history"
          >
            <IdcardOutlined /> <p style={{ fontSize: "12px" }}>History</p>
          </Link>
        </Col>
        <Col xs={5} md={3}>
          <Link
            style={{ color: "#515af6" }}
            className="fs-4 text-center"
            to="/user/password"
          >
            <SafetyOutlined /> <p style={{ fontSize: "12px" }}>Password</p>
          </Link>
        </Col>
        <Col xs={5} md={3}>
          <Link
            style={{ color: "#515af6" }}
            className="fs-4 text-center"
            to="/user/wishlist"
          >
            <HeartOutlined /> <p style={{ fontSize: "12px" }}>Wishlist</p>
          </Link>
        </Col>

        {user && user.role === "admin" && (
          <>
            <Col xs={5} md={3}>
              <Link
                style={{ color: "#515af6" }}
                className="fs-4 text-center"
                to="/admin/dashboard"
              >
                <UserOutlined /> <p style={{ fontSize: "12px" }}>Admin Dash</p>
              </Link>
            </Col>
          </>
        )}
      </Row>
    </>
  );
};

export default UserNav;
