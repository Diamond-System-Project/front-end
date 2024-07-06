import { useState, useEffect } from "react";
import { Button, Table, message } from "antd";
import { Link } from "react-router-dom";
import OrderAPI from "../api/OrderAPI";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await OrderAPI.getOrdersByUserId(userId);
        if (response.data.success) {
          const fetchedOrders = response.data.data;
          const formattedOrders = fetchedOrders.map((order) => ({
            key: order.id,
            orderId: order.orderId,
            date: order.order_date,
            totalPrice: order.payment,
            status: order.status,
          }));
          setOrders(formattedOrders);
        } else {
          message.error("Failed to fetch orders: " + response.data.message);
        }
      } catch (error) {
        message.error("Failed to fetch orders: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Completed", value: "Completed" },
        { text: "Pending", value: "Pending" },
        { text: "Processing", value: "Processing" },
        { text: "Cancelled", value: "Cancelled" },
        { text: "Delivered", value: "Delivered" },
        { text: "Delivering", value: "Delivering" },
      ],
      onFilter: (value, record) => record.status.includes(value),
      render: (status) => (
        <span className={getStatusColor(status)}>{status}</span>
      ),
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Link to={`/order-detail/${record.orderId}`}>
          <Button type="default">View Detail</Button>
        </Link>
      ),
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-500";
      case "Pending":
        return "text-yellow-500";
      case "Processing":
        return "text-blue-500";
      case "Cancelled":
        return "text-red-500";
      case "Delivered":
        return "text-purple-500";
      case "Delivering":
        return "text-orange-500";
      default:
        return "";
    }
  };

  return (
    <div className="mx-6 p-4 my-4 flex flex-col justify-center items-center w-full">
      <h1 className="text-3xl justify-center flex w-full font-bold mb-4">
        Tất cả đơn hàng
      </h1>
      <Table
        dataSource={orders}
        columns={columns}
        loading={loading}
        className="w-2/3"
      />
    </div>
  );
};

export default OrderHistory;
