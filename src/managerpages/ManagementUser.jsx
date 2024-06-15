// ManagementUser.js
import React, { useEffect, useState } from "react";
import { Table, Typography } from "antd";
import { Link } from "react-router-dom";
import UserAPI from "../api/UserAPI";

const { Title } = Typography;

const ManagementUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await UserAPI.users();
        console.log(usersData)
        setUsers(usersData.data.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        // Handle error, show message, etc.
      }
    };

    fetchUsers();
  }, []);

  const columns = [
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Detail",
      key: "detail",
      render: (record) => (
        <Link to={`/manager/management-user/user-detail/${record.userId}`}>
          Detail
        </Link>
      ),
    },
    {
      title: "Order",
      key: "order",
      render: (record) => (
        <Link to={`/manager/management-user/user-orders/${record.userId}`}>
          View Order
        </Link>
      ),
    },
  ];

  return (
    <div className="mx-6 p-4 my-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold ml-4">All Customers</h1>
        </div>
      </div>
      <Table dataSource={users} columns={columns} />
    </div>
  );
};

export default ManagementUser;
