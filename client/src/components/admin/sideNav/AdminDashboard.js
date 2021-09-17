import React, { useEffect, useState } from "react";
import AdminNav from "../AdminNav";
import { getOrders, changeStatus } from "../../../functions/admin";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Orders from "../Orders";
import { Card, Row, Col } from "antd";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    const loadOrders = () =>
      getOrders(user.token).then((res) => {
        console.log(JSON.stringify(res.data, null, 4));
        setOrders(res.data);
      });
    loadOrders();
  }, [user.token]);

  const loadAllOrders = () =>
    getOrders(user.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token).then((res) => {
      toast.success("Status updated");
      loadAllOrders();
    });
  };

  return (
    <div className="container">
      <div className="mb-2">
        <Row justify="center">
          <Col span={24} className="text-center mb-4">
            <AdminNav />
          </Col>
        </Row>
      </div>

      <div>
        <h4 className="text-center mt-2 mb-4">Admin Dashboard</h4>

        <Orders orders={orders} handleStatusChange={handleStatusChange} />
      </div>
    </div>
  );
};

export default AdminDashboard;
