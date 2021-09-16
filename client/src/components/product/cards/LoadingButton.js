import React from "react";
import { Card, Skeleton } from "antd";

const LoadingButton = ({ count }) => {
  const cards = () => {
    let totalCards = [];

    for (let i = 0; i < count; i++) {
      totalCards.push(
        <div className="col-md-3">
          <Skeleton.Button
            active
            style={{ width: 200 }}
            key={i}
            active
          ></Skeleton.Button>
        </div>
      );
    }
    return totalCards;
  };
  return <div className="row pb-5">{cards()}</div>;
};

export default LoadingButton;
