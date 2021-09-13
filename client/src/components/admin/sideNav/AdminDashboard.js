import React, { useEffect, useState } from "react";
import AdminNav from "../AdminNav";
import { getOrders, changeStatus } from "../../../functions/admin";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Orders from "../Orders";
import { Card } from "antd";

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
    <div className="container-fluid">
      <div className="row ">
        <div className="col col-md-2">
          <AdminNav />
        </div>

        <div className="col">
          <h4 className="text-center my-4 ">Admin Dashboard</h4>

          <Orders orders={orders} handleStatusChange={handleStatusChange} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
