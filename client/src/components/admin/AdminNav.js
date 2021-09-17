import React from "react";
import { Link } from "react-router-dom";
import { Divider, Menu, Row, Col, Card } from "antd";
import {
  IdcardOutlined,
  AppstoreAddOutlined,
  ApartmentOutlined,
  FileAddOutlined,
  GoldOutlined,
  TagOutlined,
  SafetyOutlined,
  UserOutlined,
} from "@ant-design/icons";

const AdminNav = () => {
  return (
    <Row justify="center">
      <Col xs={6} md={3}>
        <Link
          style={{ color: "#515af6" }}
          className="fs-4 text-center"
          to="/admin/dashboard"
        >
          <IdcardOutlined />

          <p style={{ fontSize: "12px" }}>Admin</p>
        </Link>
      </Col>

      <Col xs={6} md={3}>
        <Link
          style={{ color: "#515af6" }}
          className="fs-4"
          to="/admin/category"
        >
          <AppstoreAddOutlined /> <p style={{ fontSize: "12px" }}>Category</p>
        </Link>
      </Col>

      <Col xs={6} md={3}>
        <Link style={{ color: "#515af6" }} className="fs-4" to="/admin/sub">
          <ApartmentOutlined /> <p style={{ fontSize: "12px" }}>Sub Category</p>
        </Link>
      </Col>

      <Col xs={6} md={3}>
        <Link style={{ color: "#515af6" }} className="fs-4" to="/admin/product">
          <FileAddOutlined /> <p style={{ fontSize: "12px" }}>Product</p>
        </Link>
      </Col>

      <Col xs={6} md={3}>
        <Link
          style={{ color: "#515af6" }}
          className="fs-4"
          to="/admin/products"
        >
          <GoldOutlined /> <p style={{ fontSize: "12px" }}>Products</p>
        </Link>
      </Col>
      <Col xs={6} md={3}>
        <Link style={{ color: "#515af6" }} className="fs-4" to="/admin/coupon">
          <TagOutlined /> <p style={{ fontSize: "12px" }}>Coupon</p>
        </Link>
      </Col>

      <Col xs={6} md={3}>
        <Link
          style={{ color: "#515af6" }}
          className="fs-4"
          to="/admin/password"
        >
          <SafetyOutlined /> <p style={{ fontSize: "12px" }}>Password</p>
        </Link>
      </Col>

      <Col xs={6} md={3}>
        <Link style={{ color: "#515af6" }} className="fs-4" to="/user/history">
          <UserOutlined /> <p style={{ fontSize: "12px" }}>User Dash</p>
        </Link>
      </Col>
    </Row>
  );
};

export default AdminNav;
