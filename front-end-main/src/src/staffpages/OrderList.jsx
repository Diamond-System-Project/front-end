// import React from "react";
import { Table, Tag, Breadcrumb } from "antd";
import { Link } from "react-router-dom";

const OrderList = () => {
  const data = [
    {
      orderId: "1",
      date: "2022-01-01",
      customerName: "John Doe",
      status: "complete",
      amount: "$100",
    },
    {
      orderId: "2",
      date: "2022-01-02",
      customerName: "Jane Smith",
      status: "pending",
      amount: "$200",
    },
    {
      orderId: "3",
      date: "2022-01-03",
      customerName: "Bob Johnson",
      status: "cancel",
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
          case "complete":
            color = "green";
            break;
          case "pending":
            color = "orange";
            break;
          case "cancel":
            color = "red";
            break;
          default:
            color = "gray";
        }
        return <Tag color={color}>{status}</Tag>;
      },
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
