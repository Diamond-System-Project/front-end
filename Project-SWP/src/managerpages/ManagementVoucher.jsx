import React, { useState } from "react";
import { Table, Button, Modal, Input, DatePicker } from "antd";
import "tailwindcss/tailwind.css";
import moment from "moment";

const ManagementVoucher = () => {
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [voucherData, setVoucherData] = useState([
    {
      key: 1,
      voucherID: 1,
      startDay: "2022-01-01",
      endDay: "2022-01-31",
      pointsToBeExchange: 200,
    },
    {
      key: 2,
      voucherID: 2,
      startDay: "2022-02-01",
      endDay: "2022-02-28",
      pointsToBeExchange: 300,
    },
  ]);

  const userData = [
    {
      key: 1,
      userID: 1,
      price: 100,
      accumulatedPoints: 500,
    },
    {
      key: 2,
      userID: 2,
      price: 200,
      accumulatedPoints: 1000,
    },
  ];

  const userColumns = [
    {
      title: "UserID",
      dataIndex: "userID",
      key: "userID",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Accumulated Points",
      dataIndex: "accumulatedPoints",
      key: "accumulatedPoints",
    },
  ];

  const voucherColumns = [
    {
      title: "VoucherID",
      dataIndex: "voucherID",
      key: "voucherID",
    },
    {
      title: "Start Day",
      dataIndex: "startDay",
      key: "startDay",
    },
    {
      title: "End Day",
      dataIndex: "endDay",
      key: "endDay",
    },
    {
      title: "Points to be exchange",
      dataIndex: "pointsToBeExchange",
      key: "pointsToBeExchange",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <div>
          <Button type="primary" onClick={() => showModal(record)}>
            Edit
          </Button>
          <Button type="danger" onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const showModal = (voucher) => {
    setSelectedVoucher({ ...voucher });
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    if (selectedVoucher) {
      const updatedVoucherData = voucherData.map((voucher) =>
        voucher.key === selectedVoucher.key
          ? { ...voucher, ...selectedVoucher }
          : voucher
      );
      setVoucherData(updatedVoucherData);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = (e, field) => {
    setSelectedVoucher({
      ...selectedVoucher,
      [field]: e.target.value,
    });
  };

  const handleDateChange = (date, field) => {
    setSelectedVoucher((prevVoucher) => ({
      ...prevVoucher,
      [field]: date ? moment(date).format("YYYY-MM-DD") : "",
    }));
  };

  const handleDelete = () => {
    setIsModalVisible(false);
    if (selectedVoucher) {
      const updatedVoucherData = voucherData.filter(
        (voucher) => voucher.key !== selectedVoucher.key
      );
      setVoucherData(updatedVoucherData);
    }
  };

  return (
    <div>
      <h1>User Vouchers</h1>
      <Table dataSource={userData} columns={userColumns} />

      <h1>Vouchers</h1>
      <Table dataSource={voucherData} columns={voucherColumns} />

      <Modal
        title="Edit Voucher"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {selectedVoucher && (
          <div className="flex flex-col space-y-4">
            <p>
              <strong>Voucher ID:</strong> {selectedVoucher.voucherID}
            </p>
            <p>
              <strong>Start Day: </strong>
              <DatePicker
                defaultValue={moment(selectedVoucher.startDay)}
                onChange={(date) => handleDateChange(date, "startDay")}
              />
            </p>
            <p>
              <strong>End Day: </strong>
              <DatePicker
                defaultValue={moment(selectedVoucher.endDay)}
                onChange={(date) => handleDateChange(date, "endDay")}
              />
            </p>
            <p>
              <strong>Points to be Exchange:</strong>
              <Input
                value={selectedVoucher.pointsToBeExchange}
                onChange={(e) => handleInputChange(e, "pointsToBeExchange")}
              />
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ManagementVoucher;
