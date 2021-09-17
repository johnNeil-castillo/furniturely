import React from "react";
import { Card, Row, Col } from "antd";

const ShowPaymentInfo = ({ order, showStatus = true }) => (
  <Card>
    <div className=" text-center">
      <Row justify="center">
        <Col xs={24}>
          <div>
            <b>Order Id:</b> {order.paymentIntent.id}
          </div>
        </Col>
        <Col xs={8}>
          <div>
            <b>Amount:</b>
            <br />
            {(order.paymentIntent.amount /= 10).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </div>
        </Col>
        <Col xs={8}>
          <div>
            <b>Currency:</b>
            <br /> {order.paymentIntent.currency.toUpperCase()}
          </div>
        </Col>
        <Col xs={8}>
          <div>
            <b>Method:</b>
            <br /> {order.paymentIntent.payment_method_types[0]}
          </div>
        </Col>
        <Col xs={24}>
          <div>
            <b>Payment:</b> {order.paymentIntent.status.toUpperCase()}
          </div>
        </Col>
        <Col xs={24}>
          <div>
            <b>Ordered on:</b>
            {"  "}
            {new Date(order.paymentIntent.created * 1000).toLocaleString()}
          </div>
        </Col>

        {showStatus && (
          <Col>
            <div className="badge  text-white text-center">
              <b>STATUS:</b> {order.orderStatus}
            </div>
          </Col>
        )}
      </Row>
    </div>
  </Card>
);

export default ShowPaymentInfo;
