import React, { useState } from "react";
import { Table, Select } from "antd";
import "tailwindcss/tailwind.css";

const { Option } = Select;

const ListDelivered = () => {
  const [data, setData] = useState([
    {
      productId: 1,
      productName: "Product 1",
      username: "John Doe",
      address: "123 Main St",
      phoneNumber: "555-1234",
      status: "Pending",
    },
    {
      productId: 2,
      productName: "Product 2",
      username: "Jane Smith",
      address: "456 Park Ave",
      phoneNumber: "555-5678",
      status: "Processing",
    },
    {
      productId: 3,
      productName: "Product 3",
      username: "Bob Johnson",
      address: "789 Elm St",
      phoneNumber: "555-91011",
      status: "Cancelled",
    },
    {
      productId: 4,
      productName: "Product 4",
      username: "Alice Williams",
      address: "1011 Oak St",
      phoneNumber: "555-121314",
      status: "Shipped",
    },
    {
      productId: 5,
      productName: "Product 5",
      username: "Eva Brown",
      address: "1213 Pine St",
      phoneNumber: "555-151617",
      status: "Delivered",
    },
  ]);

  const columns = [
    {
      title: "Product ID",
      dataIndex: "productId",
      key: "productId",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Select
          style={{ width: 120 }}
          defaultValue={record.status}
          onChange={(value) => handleEditStatus(record, value)}
        >
          <Option value="Pending">Pending</Option>
          <Option value="Processing">Processing</Option>
          <Option value="Cancelled">Cancelled</Option>
          <Option value="Shipped">Shipped</Option>
          <Option value="Delivered">Delivered</Option>
        </Select>
      ),
    },
  ];

  const handleEditStatus = (record, value) => {
    const newData = data.map((item) =>
      item.productId === record.productId ? { ...item, status: value } : item
    );
    setData(newData);
  };

  return (
    <div className="mx-4 p-4">
      <h1 className="text-2xl font-bold mb-4">Delivery</h1>
      <Table dataSource={data} columns={columns} />
    </div>
  );
};

export default ListDelivered;
