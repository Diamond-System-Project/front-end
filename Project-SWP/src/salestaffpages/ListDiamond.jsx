import React from "react";
import { Table } from "antd";
// import "antd/dist/antd.css";
import "tailwindcss/tailwind.css";

export default function ListDiamond() {
  const columns = [
    {
      title: "Diamond ID",
      dataIndex: "diamondId",
      key: "diamondId",
    },
    {
      title: "Diamond Name",
      dataIndex: "diamondName",
      key: "diamondName",
    },
    {
      title: "Origin",
      dataIndex: "origin",
      key: "origin",
    },
    {
      title: "Shape",
      dataIndex: "shape",
      key: "shape",
    },
    {
      title: "Carat Weight",
      dataIndex: "caratWeight",
      key: "caratWeight",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Clarity",
      dataIndex: "clarity",
      key: "clarity",
    },
    {
      title: "Cut",
      dataIndex: "cut",
      key: "cut",
    },
    {
      title: "Base Price",
      dataIndex: "basePrice",
      key: "basePrice",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];

  const data = [
    // Add your data here
    {
      diamondId: "1",
      diamondName: "Diamond 1",
      origin: "Origin 1",
      shape: "Shape 1",
      caratWeight: "1.0",
      color: "Color 1",
      clarity: "Clarity 1",
      cut: "Cut 1",
      basePrice: "$100",
      description: "Description 1",
    },
    {
      diamondId: "2",
      diamondName: "Diamond 2",
      origin: "Origin 2",
      shape: "Shape 2",
      caratWeight: "2.0",
      color: "Color 2",
      clarity: "Clarity 2",
      cut: "Cut 2",
      basePrice: "$200",
      description: "Description 2",
    },
    // Add more data objects as needed
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">List Diamond Product</h1>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}
