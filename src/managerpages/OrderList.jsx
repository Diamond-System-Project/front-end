import { useEffect, useState } from "react";
import { Table, message, Button, Popconfirm, Select } from "antd";
import { Link } from "react-router-dom";
import OrderAPI from "../api/OrderAPI";
import GetUserByRoleAPI from "../api/GetUserByRoleAPI";

const { Option } = Select;

const OrderList = () => {
  const [data, setData] = useState([]);
  const [deliveryStaffList, setDeliveryStaffList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await OrderAPI.getAllOrders();
        const orders = response.data.data.map((order) => ({
          orderId: order.orderId,
          date: new Date(order.order_date).toLocaleDateString(),
          customerName: order.cname,
          status: order.status,
          deliveryStaff: order.deliveryStaff
            ? order.deliveryStaff.fullName
            : null,
          amount: `$${order.payment.toFixed(2)}`,
        }));
        setData(orders);
      } catch (error) {
        console.log(error);
        message.error("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    const fetchDeliveryStaff = async () => {
      try {
        const response = await GetUserByRoleAPI.getAllDeliveryStaff();
        setDeliveryStaffList(response.data);
      } catch (error) {
        console.log(error);
        message.error("Failed to fetch delivery staff");
      }
    };

    fetchOrders();
    fetchDeliveryStaff();
  }, []);

  const handleCancelOrder = async (record) => {
    try {
      const statusLowerCase = record.status.toLowerCase();

      if (["pending", "processing", "shipping"].includes(statusLowerCase)) {
        await OrderAPI.cancelOrder(record.orderId);
        const updatedData = data.map((item) => {
          if (item.orderId === record.orderId) {
            item.status = "Cancelled";
          }
          return item;
        });
        setData(updatedData);
        message.success(`Order ${record.orderId} has been cancelled.`);
      } else {
        message.error(
          `Cannot cancel order ${record.orderId} with status ${record.status}.`
        );
      }
    } catch (error) {
      console.error("Failed to cancel order:", error);
      message.error("Failed to cancel order. Please try again later.");
    }
  };

  const handleDeliveryStaffChange = async (value, record) => {
    try {
      const selectedStaff = deliveryStaffList.find(
        (staff) => staff.fullName === value
      );

      if (selectedStaff) {
        console.log(
          `Assigning order ${record.orderId} to delivery staff ${selectedStaff.userId}`
        ); // Add logging

        const payload = {
          orderId: record.orderId,
          deliveryId: selectedStaff.userId,
        };

        console.log("Request payload:", payload); // Log the payload being sent

        const response = await GetUserByRoleAPI.assignOrderToDelivery(
          record.orderId,
          selectedStaff.userId
        );

        console.log("Response from server:", response);

        const updatedData = data.map((item) => {
          if (item.orderId === record.orderId) {
            item.deliveryStaff = value;
          }
          return item;
        });

        setData(updatedData);
        message.success(
          `Order ${record.orderId} has been assigned to ${value}.`
        );
      } else {
        message.error("Selected delivery staff not found.");
      }
    } catch (error) {
      console.error(
        "Failed to assign delivery staff:",
        error.response ? error.response.data : error
      );
      message.error(
        error.response?.data?.message ||
          "Failed to assign delivery staff. Please try again later."
      );
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
      filters: [
        { text: "Pending", value: "Pending" },
        { text: "Processing", value: "Processing" },
        { text: "Shipping", value: "Shipping" },
        { text: "Delivered", value: "Delivered" },
        { text: "Cancelled", value: "Cancelled" },
      ],
      onFilter: (value, record) =>
        record.status.toLowerCase() === value.toLowerCase(),
    },
    {
      title: "Delivery Staff",
      dataIndex: "deliveryStaff",
      key: "deliveryStaff",
      render: (text, record) => (
        <Select
          style={{ width: 200 }}
          placeholder="Select Delivery Staff"
          value={record.deliveryStaff}
          onChange={(value) => handleDeliveryStaffChange(value, record)}
        >
          {deliveryStaffList.map((staff) => (
            <Option key={staff.fullName} value={staff.fullName}>
              {staff.fullName}
            </Option>
          ))}
        </Select>
      ),
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
        <>
          <Link to={`/manager/order-list/order-detail/${record.orderId}`}>
            View Detail
          </Link>{" "}
          |
          {["pending", "processing", "shipping"].includes(
            record.status.toLowerCase()
          ) ? (
            <Popconfirm
              title="Are you sure to cancel this order?"
              onConfirm={() => handleCancelOrder(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link" danger>
                Cancel Order
              </Button>
            </Popconfirm>
          ) : (
            <Button type="link" disabled>
              Cancel Order
            </Button>
          )}
        </>
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
