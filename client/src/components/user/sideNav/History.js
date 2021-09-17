import React, { useState, useEffect } from "react";
import UserNav from "../UserNav";
import { getUserOrders } from "../../../functions/user";
import { useSelector } from "react-redux";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../../ShowPaymentInfo";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "./Invoice";
import { Row, Col, Card } from "antd";

const History = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    const loadUserOrders = () =>
      getUserOrders(user.token).then((res) => {
        console.log(JSON.stringify(res.data, null, 4));
        setOrders(res.data);
      });
    loadUserOrders();
  }, [user.token]);

  const showOrderInTable = (order) => (
    <>
      <Row justify="center" className="mt-3">
        {order.products.map((p, i) => (
          <>
            <Col lg={{ span: 12 }} xs={{ span: 12 }}>
              <Card className="text-center">
                <div className="mb-2">
                  <b>{p.product.title}</b>
                </div>
                <div className="mb-2">
                  Price: ${p.product.price.toLocaleString()}
                </div>
                <div className="mb-2">Brand: {p.product.brand}</div>
                <div className="mb-2">Color: {p.color}</div>
                <div className="mb-2">Quantity: {p.count}</div>
                <div className="mb-2">
                  Shipping:{" "}
                  {p.product.shipping === "Yes" ? (
                    <CheckCircleOutlined style={{ color: "green" }} />
                  ) : (
                    <CloseCircleOutlined style={{ color: "red" }} />
                  )}
                </div>
              </Card>
            </Col>
          </>
        ))}
      </Row>
    </>
  );

  const showDownloadLink = (order) => (
    <PDFDownloadLink
      document={<Invoice order={order} />}
      fileName="invoice.pdf"
      className="btn btn-sm btn-block btn-outline-primary mt-3"
    >
      Download PDF
    </PDFDownloadLink>
  );

  const showEachOrders = () =>
    orders.reverse().map((order, i) => (
      <Col lg={12}>
        <Card key={i} className="mb-3 mx-2">
          <ShowPaymentInfo order={order} />
          {showOrderInTable(order)}
          <div className="row">
            <div className="col">{showDownloadLink(order)}</div>
          </div>
        </Card>
      </Col>
    ));

  return (
    <div className="container">
      <div>
        <Row justify="center">
          <Col span={24} className="text-center mb-4">
            <UserNav />
          </Col>
        </Row>
        <div className=" text-center mb-2">
          <h4 className="mt-2 mb-4">
            {orders.length > 0 ? "User purchase orders" : "No purchase orders"}
          </h4>
          <Row>{showEachOrders()}</Row>
        </div>
      </div>
    </div>
  );
};

export default History;
