// import React from "react";
import { Table, Tag, Breadcrumb } from "antd";
import { Link } from "react-router-dom";

const OrderList = () => {
  const data = [
    {
      orderId: "1",
      date: "2022-01-01",
      customerName: "John Doe",
      status: "delivered",
      amount: "$100",
    },
    {
      orderId: "2",
      date: "2022-01-02",
      customerName: "Jane Smith",
      status: "delivering",
      amount: "$200",
    },
    {
      orderId: "3",
      date: "2022-01-03",
      customerName: "Bob Johnson",
      status: "cancel",
      amount: "$300",
    },
    {
      orderId: "4",
      date: "2022-01-03",
      customerName: "Bo son",
      status: "processing",
      amount: "$300",
    },
  ];

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
            color = "orange";
            break;
          case "delivering":
            color = "orange";
            break;
          case "delivered":
            color = "green";
            break;
          case "cancel":
            color = "red";
            break;
          default:
            color = "gray";
        }
        return <Tag color={color}>{status}</Tag>;
      },
      filters: [
        {
          text: "processing",
          value: "processing",
        },
        {
          text: "delivering",
          value: "delivering",
        },
        {
          text: "delivered",
          value: "delivered",
        },
        {
          text: "cancel",
          value: "cancel",
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
    <>
      <div className="mx-6 p-4 my-4">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Order List</h1>
          <Breadcrumb className="text-gray-600">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Order List</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Table dataSource={data} columns={columns} />
      </div>
    </>
  );
};

export default OrderList;
