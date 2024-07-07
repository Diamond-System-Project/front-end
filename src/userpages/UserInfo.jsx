import { useState, useEffect } from "react";
import { Input, Button, Radio, DatePicker, List, Modal } from "antd";
import AuthAPI from "../api/AuthAPI";
import VoucherTypeAPI from "../api/VoucherTypeAPI";
import VoucherAPI from "../api/VoucherAPI";
import openNotificationWithIcon from "../notification";
import moment from "moment";

export default function UserInfo() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState(null);
  const [point, setPoint] = useState(0);
  const [voucherTypes, setVoucherTypes] = useState([]);
  const [selectedVoucherType, setSelectedVoucherType] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await AuthAPI.getUserById(userId);
        if (response.status === 200) {
          const userData = response.data.data;
          setName(userData.fullName);
          setEmail(userData.email);
          setPhone(userData.phone);
          setGender(userData.gender);
          setDob(moment(userData.dob));
          setPoint(userData.point);
        } else {
          openNotificationWithIcon("error", "Failed to fetch user details");
        }
      } catch (error) {
        openNotificationWithIcon(
          "error",
          "Failed to fetch user details",
          error.message
        );
      }
    };

    const fetchVoucherTypes = async () => {
      try {
        const response = await VoucherTypeAPI.getAll();
        const enhancedVoucherTypes = response.data.map((voucher) => ({
          ...voucher,
          discountLength: voucher.discountLength,
          pointNeeded: voucher.pointNeeded,
          active: voucher.active,
        }));
        setVoucherTypes(enhancedVoucherTypes);
      } catch (error) {
        openNotificationWithIcon(
          "error",
          "Failed to fetch voucher types",
          error.message
        );
      }
    };

    fetchUserDetails();
    fetchVoucherTypes();
  }, [userId]);

  const handleSave = async () => {
    const userData = {
      fullName: name,
      phone,
      dob: dob ? dob.format("dd-MM-yyyy") : null,
      gender,
    };

    try {
      const response = await AuthAPI.updateUser(userId, userData);
      if (response.status === 200) {
        openNotificationWithIcon("success", "Details updated successfully");
      } else {
        openNotificationWithIcon("error", "Failed to update details");
      }
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "Failed to update details",
        error.message
      );
    }
  };

  const handleVoucherSelect = (voucherType) => {
    setSelectedVoucherType(voucherType);
    setIsModalVisible(true);
  };

  const handleCreateVoucher = async () => {
    if (!selectedVoucherType) {
      openNotificationWithIcon("warning", "Please select a voucher type");
      return;
    }

    const voucherData = {
      voucherTypeId: selectedVoucherType.voucherTypeId,
    };

    try {
      const response = await VoucherAPI.create(userId, voucherData);
      if (response.status === 200) {
        openNotificationWithIcon("success", "Voucher created successfully");
        setIsModalVisible(false);
      } else {
        if (response.data && response.data.message) {
          openNotificationWithIcon(
            "error",
            `Failed to create voucher: ${response.data.message}`
          );
        }
      }
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "Failed to create voucher",
        error.message || "Unknown error"
      );
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="flex flex-col items-center justify-center my-10">
      <div className="w-full max-w-4xl bg-white p-6 shadow-md rounded-lg">
        <h1 className="text-2xl text-center font-semibold mb-8">
          Thông tin tài khoản
        </h1>
        <div className="flex flex-col space-y-10">
          <div className="space-y-8">
            <div className="flex items-center">
              <label className="w-32">Họ và tên:</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex items-center">
              <label className="w-32">Email:</label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                disabled
              />
            </div>
            <div className="flex items-center">
              <label className="w-32">Số điện thoại:</label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex items-center">
              <label className="w-32">Giới tính:</label>
              <Radio.Group
                onChange={(e) => setGender(e.target.value)}
                value={gender}
                className="w-full"
              >
                <Radio value="male">Nam</Radio>
                <Radio value="female">Nữ</Radio>
              </Radio.Group>
            </div>
            <div className="flex items-center">
              <label className="w-32">Ngày sinh:</label>
              <DatePicker
                value={dob}
                onChange={(date) => setDob(date)}
                className="w-full"
                format="YYYY-MM-DD"
              />
            </div>
            <div className="flex items-center">
              <label className="w-32">Điểm:</label>
              <Input
                value={point}
                onChange={(e) => setPoint(e.target.value)}
                className="w-full"
                type="number"
                disabled
              />
            </div>
          </div>
          <Button type="primary" className="w-full" onClick={handleSave}>
            Lưu
          </Button>
        </div>
      </div>
      <div className="bg-white shadow-md rounded p-4 mt-4 w-full max-w-4xl">
        <h2 className="text-lg font-semibold">Loại Voucher</h2>
        <List
          itemLayout="horizontal"
          dataSource={voucherTypes}
          renderItem={(voucher) => (
            <List.Item
              key={voucher.id}
              onClick={() => handleVoucherSelect(voucher)}
              className="cursor-pointer"
            >
              <List.Item.Meta
                title={`Loại Voucher ID: ${voucher.voucherTypeId}`}
                description={`Giảm giá: ${voucher.discount * 100}%`}
              />
              <div>
                Thời gian giảm giá: {voucher.discountLength} ngày
                <br />
                Điểm cần thiết: {voucher.pointNeeded}
                <br />
                Hoạt động: {voucher.active ? "Có" : "Không"}
              </div>
            </List.Item>
          )}
        />
      </div>
      <Modal
        title="Chọn loại voucher để tạo voucher"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button
            key="create"
            type="primary"
            onClick={handleCreateVoucher}
            disabled={!selectedVoucherType}
          >
            Tạo Voucher
          </Button>,
        ]}
      >
        {selectedVoucherType && (
          <div>
            <p>
              Bạn đang chọn Loại Voucher ID: {selectedVoucherType.voucherTypeId}
            </p>
            <p>Thời gian giảm giá: {selectedVoucherType.discountLength} ngày</p>
            <p>Điểm cần thiết: {selectedVoucherType.pointNeeded}</p>
            <p>Hoạt động: {selectedVoucherType.active ? "Có" : "Không"}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}
