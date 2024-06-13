import React from "react";
import { Table, Button } from "antd";

export default function OrderDetails() {
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-500";
      case "Pending":
        return "text-yellow-500";
      case "Processing":
        return "text-blue-500";
      case "Cancelled":
        return "text-red-500";
      case "Delivered":
        return "text-purple-500";
      case "Delivering":
        return "text-orange-500";
      default:
        return "";
    }
  };

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
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Completed", value: "Completed" },
        { text: "Pending", value: "Pending" },
        { text: "Processing", value: "Processing" },
        { text: "Cancelled", value: "Cancelled" },
        { text: "Delivered", value: "Delivered" },
        { text: "Delivering", value: "Delivering" },
      ],
      onFilter: (value, record) => record.status.includes(value),
      render: (status) => (
        <span className={getStatusColor(status)}>{status}</span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Button type="link">Gửi chứng nhận</Button>
          <Button type="link">Giấy bảo hành</Button>
          <Button type="link">Yêu cầu hoàn hàng</Button>
          <Button type="link">Liên hệ</Button>
        </>
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
        <h1 className="text-2xl text-center font-semibold mb-4">
          Chi tiết đơn hàng
        </h1>
        <Table columns={columns} dataSource={data} pagination={false} />
        <div className="bg-white shadow-md rounded p-4 mt-4">
          <h2 className="text-lg font-semibold">Điểm tích lũy</h2>
          <div className="mt-2 space-y-2">
            <div className="flex items-center justify-between">
              <span>Tổng điểm:</span>
              <span>1000 điểm</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Số điểm quy đổi:</span>
              <span>200 điểm</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
