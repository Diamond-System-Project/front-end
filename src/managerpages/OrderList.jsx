import { useEffect, useState } from "react";
import { Table, message, Button, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import OrderAPI from "../api/OrderAPI";

const OrderList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await OrderAPI.getAllOrders();
        console.log(response);
        const orders = response.data.data.map((order) => ({
          orderId: order.orderId,
          date: new Date(order.order_date).toLocaleDateString(),
          customerName: order.cname,
          status: order.status,
          deliveryStaff: order.deliveryStaff
            ? order.deliveryStaff.fullName
            : "N/A",
          amount: `$${order.payment.toFixed(2)}`,
        }));
        setData(orders);
        console.log(orders);
      } catch (error) {
        console.log(error);
        message.error("Failed to fetch orders");
      }
    };

    fetchOrders();
  }, []);

  const handleCancelOrder = async (record) => {
    try {
      // Convert record.status to lowercase for case-insensitive comparison
      const statusLowerCase = record.status.toLowerCase();

      if (
        statusLowerCase === "pending" ||
        statusLowerCase === "processing" ||
        statusLowerCase === "shipping"
      ) {
        await OrderAPI.cancelOrder(record.orderId);
        const updatedData = data.map((item) => {
          if (item.orderId === record.orderId) {
            item.status = "Cancelled";
          }
          return item;
        });
        setData(updatedData);
        message.success(`Order ${record.orderId} has been cancelled.`);
      } else {
        message.error(
          `Cannot cancel order ${record.orderId} with status ${record.status}.`
        );
      }
    } catch (error) {
      console.error("Failed to cancel order:", error);
      message.error("Failed to cancel order. Please try again later.");
    }
  };

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

      filters: [
        {
          text: "Pending",
          value: "pending",
        },
        {
          text: "Processing",
          value: "processing",
        },
        {
          text: "Shipping",
          value: "Shipping",
        },
        {
          text: "Delivered",
          value: "delivered",
        },
        {
          text: "Cancelled",
          value: "Cancelled",
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
      title: "Delivery Staff",
      dataIndex: "deliveryStaff",
      key: "deliveryStaff",
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
        <>
          <Link to={`/manager/order-list/order-detail/${record.orderId}`}>
            View Detail
          </Link>{" "}
          |
          {record.status.toLowerCase() === "pending" ||
          record.status.toLowerCase() === "processing" ||
          record.status.toLowerCase() === "shipping" ? (
            <Popconfirm
              title="Are you sure to cancel this order?"
              onConfirm={() => handleCancelOrder(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link" danger>
                Cancel Order
              </Button>
            </Popconfirm>
          ) : (
            <Button type="link" disabled>
              Cancel Order
            </Button>
          )}
        </>
      ),
    },
  ];

  return (
    <div className="mx-6 p-4 my-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Order List</h1>
      </div>
      <Table dataSource={data} columns={columns} />
    </div>
  );
};

export default OrderList;
