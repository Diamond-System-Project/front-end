import React from "react";
import { Table } from "antd";
import "tailwindcss/tailwind.css";

export default function ListMountDiamond() {
  const dataSource = [
    {
      MountId: 1,
      MountName: "Mount 1",
      Size: "Small",
      Type: "Type 1",
      Material: "Material 1",
      BasePrice: "$100",
    },
    {
      MountId: 2,
      MountName: "Mount 2",
      Size: "Medium",
      Type: "Type 2",
      Material: "Material 2",
      BasePrice: "$200",
    },
  ];

  const columns = [
    {
      title: "MountId",
      dataIndex: "MountId",
      key: "MountId",
    },
    {
      title: "Mount Name",
      dataIndex: "MountName",
      key: "MountName",
    },
    {
      title: "Size",
      dataIndex: "Size",
      key: "Size",
    },
    {
      title: "Type",
      dataIndex: "Type",
      key: "Type",
    },
    {
      title: "Material",
      dataIndex: "Material",
      key: "Material",
    },
    {
      title: "Base Price",
      dataIndex: "BasePrice",
      key: "BasePrice",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">List Mount Diamond</h1>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}
