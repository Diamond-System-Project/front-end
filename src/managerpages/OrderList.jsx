import React, { useState } from "react";
import { Table, Select } from "antd";
import { Link } from "react-router-dom";

const { Option } = Select;

const OrderList = () => {
  const [data, setData] = useState([
    {
      orderId: "1",
      date: "2022-01-01",
      customerName: "John Doe",
      status: "Delivered",
      amount: "$100",
    },
    {
      orderId: "2",
      date: "2022-01-02",
      customerName: "Jane Smith",
      status: "Delivering",
      amount: "$200",
    },
    {
      orderId: "3",
      date: "2022-01-03",
      customerName: "Bob Johnson",
      status: "Cancelled",
      amount: "$300",
    },
    {
      orderId: "4",
      date: "2022-01-03",
      customerName: "Bo son",
      status: "Processing",
      amount: "$300",
    },
  ]);

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
          value: "processing",
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
          value: "cancelled",
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
