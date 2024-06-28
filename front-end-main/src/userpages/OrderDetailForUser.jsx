import React from "react";
import { Table, Button } from "antd";

export default function OrderDetails() {
  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Thành tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div className="flex space-x-2">
          <Button type="link">Gửi chứng nhận</Button>
          <Button type="link">Giấy bảo hành</Button>
          <Button type="link">Liên hệ</Button>
        </div>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      productName: "SP01",
      quantity: 1,
      totalPrice: "100,000,000",
      status: "Completed",
    },
    {
      key: "2",
      productName: "SP02",
      quantity: 2,
      totalPrice: "50,000,000",
      status: "Pending",
    },
    {
      key: "3",
      productName: "SP03",
      quantity: 1,
      totalPrice: "30,000,000",
      status: "Cancelled",
    },
    {
      key: "4",
      productName: "SP04",
      quantity: 3,
      totalPrice: "150,000,000",
      status: "Processing",
    },
    {
      key: "5",
      productName: "SP05",
      quantity: 4,
      totalPrice: "200,000,000",
      status: "Delivered",
    },
    {
      key: "6",
      productName: "SP06",
      quantity: 1,
      totalPrice: "70,000,000",
      status: "Delivering",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center my-10">
      <div className="w-full max-w-6xl">
        <h1 className="text-3xl justify-center flex w-full font-bold mb-4">
          Chi tiết đơn hàng
        </h1>
        <Table columns={columns} dataSource={data} pagination={false} />
      </div>
    </div>
  );
}
