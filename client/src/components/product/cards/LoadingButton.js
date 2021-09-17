import React from "react";
import { Card, Skeleton, Row, Col } from "antd";

const LoadingButton = ({ count }) => {
  const cards = () => {
    let totalCards = [];

    for (let i = 0; i < count; i++) {
      totalCards.push(
        <div className="col-md-3 col-3 text-center">
          <Skeleton.Input
            active
            size="large"
            shape="default"
            style={{ width: 50 }}
            key={i}
            active
          ></Skeleton.Input>
        </div>
      );
    }
    return totalCards;
  };
  return <div className="row pb-5">{cards()}</div>;
};

export default LoadingButton;
