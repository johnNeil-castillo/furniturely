import React from "react";
import { Card, Skeleton } from "antd";

const LoadingCard = ({ count }) => {
  const cards = () => {
    let totalCards = [];

    for (let i = 0; i < count; i++) {
      totalCards.push(
        <div className="col-md-3 ">
          <Card>
            <Skeleton active></Skeleton>
          </Card>
        </div>
      );
    }
    return totalCards;
  };
  return <div className="row pb-5">{cards()}</div>;
};

export default LoadingCard;
