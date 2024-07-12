// import React from "react";
import { Input, Dropdown, Menu, Button } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";

const Headerv2 = () => {
  const { Search } = Input;
  const navigate = useNavigate();

  // const token = localStorage.getItem("accessToken");
  // // const userId = localStorage.getItem("userId");
  // const fullName = localStorage.getItem("fullName");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("fullName");
    navigate("/login");
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="#settings">Settings</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="flex justify-end items-center p-4 bg-white shadow-md h-24 w-full sticky right-0">
      <Search
        placeholder="Search"
        onSearch={(value) => console.log(value)}
        style={{ width: 200 }}
        className="mr-4"
        prefix={<SearchOutlined />}
      />

      <Dropdown overlay={menu} trigger={["click"]}>
        <Button
          className="ant-dropdown-link flex items-center"
          onClick={(e) => e.preventDefault()}
        >
          <UserOutlined style={{ fontSize: "20px", marginRight: "8px" }} />
          <span>MANAGER</span>
        </Button>
      </Dropdown>
    </div>
  );
};

export default Headerv2;
