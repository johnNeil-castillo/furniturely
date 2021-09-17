import React from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../ShowPaymentInfo";
import { Card, Row, Col } from "antd";

const Orders = ({ orders, handleStatusChange }) => {
  const showOrderInTable = (order) => (
    <>
      <Row justify="center">
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
  return (
    <>
      <Row justify="center">
        {orders.map((order) => (
          <Col lg={10} className="mx-1">
            <Card className="mb-3 ">
              <div key={order._id} className="row pb-2 ">
                <div>
                  <ShowPaymentInfo order={order} showStatus={false} />

                  <Row justify="center" align="middle" className="my-2">
                    <Col xs={24}>
                      <div className="mb-2 fs-6 text-center">
                        <b>Delivery Status </b>{" "}
                      </div>
                    </Col>
                    <Col>
                      <div>
                        <select
                          onChange={(e) =>
                            handleStatusChange(order._id, e.target.value)
                          }
                          className="form-control"
                          defaultValue={order.orderStatus}
                          name="status"
                        >
                          <option value="Not Processed">Not Processed</option>
                          <option value="Cash On Delivery">
                            Cash On Delivery
                          </option>
                          <option value="Processing">Processing</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                    </Col>
                  </Row>
                </div>
                {showOrderInTable(order)}
              </div>
            </Card>
          </Col>
        ))}{" "}
      </Row>
    </>
  );
};

export default Orders;
