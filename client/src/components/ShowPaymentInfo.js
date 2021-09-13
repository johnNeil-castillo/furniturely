import React from "react";

const ShowPaymentInfo = ({ order, showStatus = true }) => (
  <div>
    <p className="mt-3 fs-6 text-center">
      <span>
        <b>Order Id:</b> {order.paymentIntent.id}
      </span>
      {" / "}
      <span>
        <b>Amount:</b>{" "}
        {(order.paymentIntent.amount /= 10).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </span>
      {" / "}
      <span>
        <b>Currency:</b> {order.paymentIntent.currency.toUpperCase()}
      </span>
      {" / "}
      <span>
        <b>Method:</b> {order.paymentIntent.payment_method_types[0]}
      </span>
      {" / "}
      <span>
        <b>Payment:</b> {order.paymentIntent.status.toUpperCase()}
      </span>
      {" / "}
      <span>
        <b>Orderd on:</b>
        {"  "}
        {new Date(order.paymentIntent.created * 1000).toLocaleString()}
      </span>

      <br />
      {showStatus && (
        <span className="badge bg-primary text-white">
          <b>STATUS:</b> {order.orderStatus}
        </span>
      )}
    </p>
  </div>
);

export default ShowPaymentInfo;
