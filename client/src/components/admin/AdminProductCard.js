import React from "react";
import { Card } from "antd";
import sampleImage from "../../images/SampleImage.png";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
  const { title, description, images, slug } = product;

  return (
    <Card
      hoverable
      cover={
        <img
          alt="sample"
          src={images && images.length ? images[0].url : sampleImage}
          style={{ height: "150px", objectFit: "cover" }}
          className="p-2"
        />
      }
      actions={[
        <Link to={`/admin/product/${slug}`}>
          <EditOutlined className="text-warning" />
        </Link>,
        <DeleteOutlined
          onClick={() => handleRemove(slug)}
          className="text-danger"
        />,
      ]}
    >
      <Meta
        title={title}
        description={`${description && description.substring(0, 20)}...`}
      />
    </Card>
  );
};

export default AdminProductCard;
