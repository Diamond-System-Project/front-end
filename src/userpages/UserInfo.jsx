import { useState, useEffect } from "react";
import { Input, Button, Radio, DatePicker } from "antd";
import AuthAPI from "../api/AuthAPI";
import openNotificationWithIcon from "../notification";
import moment from "moment";

export default function UserInfo() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [gender, setGender] = useState();
  const [dob, setDob] = useState();
  const [point, setPoint] = useState();
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

    fetchUserDetails();
  }, [userId]);

  const handleSave = async () => {
    const userData = {
      fullName: name,
      phone,
      dob: dob.format("YYYY-MM-DD"),
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
    </div>
  );
}
