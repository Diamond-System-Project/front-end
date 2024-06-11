// import React from "react";
import { Menu } from "antd";
import {
  DashboardOutlined,
  AppstoreOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="h-screen w-[15%] bg-white shadow-md sticky top-0 left-0">
      <div className="flex items-center justify-center py-4 w-full h-32">
        <Link to="/staff/list-diamond">
          <img
            src="/assets/images/Song long diamond.png"
            alt="Logo"
            className="h-auto w-52"
          />
        </Link>
      </div>
      <Menu mode="inline" defaultSelectedKeys={["1"]} className="border-r-0">
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link to="/staff/list-diamond">List Diamond</Link>
        </Menu.Item>

        <Menu.Item key="2" icon={<AppstoreOutlined />}>
          <Link to="/staff/list-mount-diamond">List Mount Diamond</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<OrderedListOutlined />}>
          <Link to="/staff/stock-list">Stock List</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<OrderedListOutlined />}>
          <Link to="/staff/order-list">List Order</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default SideBar;
