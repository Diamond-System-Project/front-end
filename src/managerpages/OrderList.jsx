import React, { useEffect, useState } from "react";
import { Table, Select, message } from "antd";
import { Link } from "react-router-dom";
import OrderAPI from "../api/OrderAPI";

const { Option } = Select;

const OrderList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await OrderAPI.getAllOrders();
        console.log(response)
        const orders = response.data.data.map(order => ({
          orderId: order.orderId,
          date: new Date(order.order_date).toLocaleDateString(),
          customerName: order.cname,
          status: order.status,
          amount: `$${order.payment.toFixed(2)}`,
        }));
        setData(orders);
      } catch (error) {
        console.log(error)
        message.error("Failed to fetch orders");
      }
    };

    fetchOrders();
  }, []);

  const handleChangeStatus = (value, record) => {
    const updatedData = data.map((item) => {
      if (item.orderId === record.orderId) {
        item.status = value;
      }
      return item;
    });
    setData(updatedData);
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
      render: (status, record) => {
        return (
          <Select
            value={status}
            onChange={(value) => handleChangeStatus(value, record)}
            style={{ width: 120 }}
          >
            <Option value="pending">Pending</Option>
            <Option value="processing">Processing</Option>
            <Option value="Cancelled">Cancelled</Option>
            <Option value="delivering">Delivering</Option>
            <Option value="delivered">Delivered</Option>
          </Select>
        );
      },
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
          text: "Delivering",
          value: "delivering",
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
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Link to={`/manager/order-list/order-detail/${record.orderId}`}>
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
      <Table dataSource={data} columns={columns} />
    </div>
  );
};

export default OrderList;
