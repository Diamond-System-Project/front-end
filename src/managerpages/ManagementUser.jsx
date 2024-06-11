import { Table } from "antd";
import { Link } from "react-router-dom";

const ManagementUser = () => {
  const dataSource = [
    {
      key: "1",
      userId: "1",
      userName: "John Doe",
    },
    {
      key: "2",
      userId: "2",
      userName: "Jane Smith",
    },
  ];

  const columns = [
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Detail",
      key: "detail",
      render: (record) => (
        <Link to={`/manager/management-user/user-detail/${record.key}`}>
          Detail
        </Link>
      ),
    },
    {
      title: "Order",
      key: "order",
      render: (record) => (
        <Link to={`/manager/management-user/user-orders/${record.key}`}>
          View Order
        </Link>
      ),
    },
  ];

  return (
    <div className="mx-6 p-4 my-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold ml-4">All Customer</h1>
        </div>
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default ManagementUser;
