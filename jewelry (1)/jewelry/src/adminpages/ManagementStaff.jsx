import { Button, Table } from "antd";
import { Link } from "react-router-dom";
import { Breadcrumb } from "antd";

const handleAction = (record) => {
  console.log("Button clicked for record: ", record);
};

const handleDelete = (record) => {
  console.log("Button clicked for record: ", record);
};

const ManagementStaff = () => {
  const dataSource = [
    {
      key: "1",
      userName: "John Doe",
      gender: "Male",
      dob: "01/01/1990",
      role: "Manager",
    },
    {
      key: "2",
      userName: "Jane Smith",
      gender: "Male",
      dob: "01/01/1990",
      role: "Manager",
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
          <Breadcrumb className="text-gray-600 ml-4">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>All Staff</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default ManagementStaff;
