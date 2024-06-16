import React from "react";
import { Button, Table } from "antd";
import { Link } from "react-router-dom";

const handleAction = (record) => {
  console.log("Edit button clicked for record: ", record);
};

const handleDelete = (record) => {
  console.log("Delete button clicked for record: ", record);
};

const ManagementStaff = () => {
  const dataSource = [
    {
      key: "1",
      userName: "John Doe",
      gender: "Male",
      dob: "01/01/1990",
      role: "Sale Staff",
    },
    {
      key: "2",
      userName: "Jane Smith",
      gender: "Female",
      dob: "01/01/1990",
      role: "Manager",
    },
    {
      key: "3",
      userName: "Jane Smith",
      gender: "Female",
      dob: "01/01/1990",
      role: "Delivery Staff",
    },
  ];

  const columns = [
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Date Of Birth",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      filters: [
        {
          text: "Manager",
          value: "Manager",
        },
        {
          text: "Sale Staff",
          value: "Sale Staff",
        },
        {
          text: "Delivery Staff",
          value: "Delivery Staff",
        },
      ],
      onFilter: (value, record) => record.role.includes(value),
    },
    {
      title: "Edit",
      key: "edit",
      render: (text, record) => (
        <Link
          to={`/admin/staff-detail/${record.key}`}
          onClick={() => handleAction(record)}
        >
          Edit
        </Link>
      ),
    },
    {
      title: "Delete",
      key: "delete",
      render: (text, record) => (
        <Button type="danger" onClick={() => handleDelete(record)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div className="mx-6 p-4 my-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold ml-4">All Staff</h1>
        </div>
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default ManagementStaff;
