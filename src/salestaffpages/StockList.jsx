import React from "react";
import { Table } from "antd";
import "tailwindcss/tailwind.css";

export default function StockList() {
  const dataSource = [
    { Diamondid: "D1", MountId: "M1", quantity: 10 },
    { Diamondid: "D2", MountId: "M2", quantity: 5 },
    { Diamondid: "D3", MountId: "M3", quantity: 8 },
  ];

  const columns = [
    {
      title: "Diamond ID",
      dataIndex: "Diamondid",
      key: "Diamondid",
    },
    {
      title: "Mount ID",
      dataIndex: "MountId",
      key: "MountId",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Stock List</h1>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}
