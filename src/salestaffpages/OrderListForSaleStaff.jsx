import { useState, useEffect } from "react";
import { Table, Tag, Spin, message } from "antd";
import { Link } from "react-router-dom";
import OrderAPI from "../api/OrderAPI";

const OrderList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await OrderAPI.getAllOrders();
        console.log("API response:", response); // Log the entire response

        // Check if the response has the expected structure
        if (response.data && Array.isArray(response.data.data)) {
          // Transform and set data
          const orders = response.data.data.map((order) => ({
            orderId: order.orderId,
            customerName: order.cname,
            date: order.order_date,
            status: order.status.toLowerCase(), // Ensure status is in lowercase for filtering
            amount: order.payment,
          }));
          setData(orders);
        } else {
          console.error("Unexpected data format:", response.data); // Log the unexpected format
          throw new Error("Unexpected data format");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        message.error("Failed to fetch orders.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
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
      render: (status) => {
        let color;
        switch (status) {
          case "processing":
          case "pending":
          case "shipping":
            color = "orange";
            break;
          case "delivered":
            color = "green";
            break;
          case "cancelled":
          case "cancel":
            color = "red";
            break;
          default:
            color = "gray";
        }
        return <Tag color={color}>{status}</Tag>;
      },
      filters: [
        { text: "processing", value: "processing" },
        { text: "pending", value: "pending" },
        { text: "shipping", value: "shipping" },
        { text: "delivered", value: "delivered" },
        { text: "cancelled", value: "cancelled" },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Link to={`/staff/order-list/order-detail/${record.orderId}`}>
          View Detail
        </Link>
      ),
    },
  ];

  return (
    <div className="mx-6 p-4 my-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Order List</h1>
      </div>
      {loading ? (
        <Spin tip="Loading..." />
      ) : (
        <Table dataSource={data} columns={columns} rowKey="orderId" />
      )}
    </div>
  );
};

export default OrderList;