import React, { useState } from "react";
import { Table, Input, Button, Radio } from "antd";

export default function UserInfo() {
  const [name, setName] = useState("?");
  const [email, setEmail] = useState("?@gmail.com");
  const [phone, setPhone] = useState("0123456789");
  const [gender, setGender] = useState("Nam");

  const handleSave = () => {
    // Add save logic here, for now, we'll just log the updated information
    console.log({ name, email, phone, gender });
  };

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Ngày đặt",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Thành tiền",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Trạng thái thanh toán",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
    },
    {
      title: "Vận chuyển",
      dataIndex: "shipping",
      key: "shipping",
    },
  ];

  const data = [
    {
      key: "1",
      orderId: "#103487",
      date: "11/06/2024",
      total: "78,000,000",
      paymentStatus: "Đang xử lý",
      shipping: "Đang vận chuyển",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center my-10">
      <div className="w-full max-w-4xl">
        <h1 className="text-2xl text-center font-semibold mb-4">
          Thông tin tài khoản
        </h1>
        <div className="flex space-x-10 ">
          <div className="p-4 w-1/4">
            <p className="font-medium">Tài khoản</p>
            <p className="font-medium">Danh sách địa chỉ</p>
            <button className="font-medium cursor-pointer text-red-500">
              Đăng xuất
            </button>
          </div>
          <div className="flex flex-col space-y-4 w-full">
            <div className="bg-white shadow-md rounded p-4">
              <h2 className="text-lg font-semibold">Tài khoản của bạn</h2>
              <div className="mt-2 space-y-2">
                <div className="flex items-center">
                  <label className="w-32">Họ và tên:</label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex items-center">
                  <label className="w-32">Email:</label>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex items-center">
                  <label className="w-32">Số điện thoại:</label>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="flex items-center">
                  <label className="w-32">Giới tính:</label>
                  <Radio.Group
                    onChange={(e) => setGender(e.target.value)}
                    value={gender}
                  >
                    <Radio value="Nam">Nam</Radio>
                    <Radio value="Nữ">Nữ</Radio>
                  </Radio.Group>
                </div>
              </div>
              <Button
                type="primary"
                className="mt-4 w-full"
                onClick={handleSave}
              >
                Lưu
              </Button>
            </div>
            <div className="bg-white shadow-md rounded p-4">
              <h2 className="text-lg font-semibold">
                Danh sách đơn hàng mới nhất
              </h2>
              <Table columns={columns} dataSource={data} pagination={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
