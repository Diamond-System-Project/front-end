import { useEffect, useState } from "react";
import { Table, Select, message } from "antd";
import { Link } from "react-router-dom";
import OrderAPI from "../api/OrderAPI";

const { Option } = Select;

const OrderList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const deliveryStaffId = 1;
      const response = await OrderAPI.getOrdersByDeliveryStaffId(
        deliveryStaffId
      );
      const orders = response.data.data.map((order) => ({
        key: order.orderId,
        orderId: order.orderId,
        date: new Date(order.order_date).toLocaleDateString(),
        customerName: order.cname,
        status: order.status,
        amount: `$${order.payment.toFixed(2)}`,
      }));
      setData(orders);
    } catch (error) {
      console.log(error);
      message.error("Failed to fetch orders");
    }
  };

  const handleChangeStatus = async (value, record) => {
    setLoading(true);
    try {
      const response = await OrderAPI.updateOrderStatusByDelivery(
        record.orderId,
        value
      );
      if (response.data.success) {
        message.success(`Order ${record.orderId} status updated successfully`);
        fetchOrders();
      } else {
        message.error(
          `Failed to update order ${record.orderId} status: ${response.data.message}`
        );
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      message.error(`Failed to update order ${record.orderId} status`);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Select
          value={status}
          onChange={(value) => handleChangeStatus(value, record)}
          style={{ width: 120 }}
          disabled={loading}
        >
          <Option value="pending">Pending</Option>
          <Option value="processing">Processing</Option>
          <Option value="shipping">Shipping</Option>
          <Option value="delivered">Delivered</Option>
        </Select>
      ),
      filters: [
        { text: "Pending", value: "pending" },
        { text: "Processing", value: "processing" },
        { text: "Shipping", value: "shipping" },
        { text: "Delivered", value: "delivered" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Link to={`/manager/order-list/order-detail/${record.orderId}`}>
          View Detail
        </Link>
      ),
    },
  ];

  return (
    <div className="mx-6 p-4 my-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Order List</h1>
      </div>
      <Table dataSource={data} columns={columns} loading={loading} />
    </div>
  );
};

export default OrderList;
