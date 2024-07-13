import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Col, Row, Table, Typography, Spin, message } from "antd";
import OrderDetailAPI from "../api/OrderDetailAPI";

const { Title, Text } = Typography;

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      message.error("Order ID is not provided.");
      return;
    }

    const fetchOrderDetails = async () => {
      try {
        const response = await OrderDetailAPI.getOrderDetailsByOrderId(id);
        console.log("API response:", response);
        if (
          response.data &&
          response.data.data &&
          response.data.data.length > 0
        ) {
          setOrder(response.data.data[0]);
        } else {
          console.error("Unexpected data format:", response.data);
          message.error("Failed to fetch order details.");
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
        message.error("Failed to fetch order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  if (!order) {
    return <p>No order details found.</p>;
  }

  const columns = [
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
  ];

  const orderInfo = order.orderId;
  const products = [
    {
      key: 1,
      productName: order.productId.productName,
      quantity: order.quantity,
      price: order.productId.price * order.quantity,
    },
  ];

  return (
    <div className="p-6 bg-gray-100">
      <Card className="mb-6 shadow">
        <Row gutter={16} justify="space-between" align="middle">
          <Col>
            <Title level={4}>Order ID: {orderInfo.orderId}</Title>
            <Text>Date: {orderInfo.order_date}</Text>
          </Col>
          <Col>
            <Text>Status: {orderInfo.status}</Text>
          </Col>
        </Row>
      </Card>

      <Row gutter={16} className="mb-6 h-fit">
        <Col span={8}>
          <Card title="Customer" className="shadow">
            <p>Full Name: {orderInfo.cname}</p>
            <p>Email: {orderInfo.email}</p>
            <p>Phone: {orderInfo.phone}</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Order Info" className="shadow">
            <p>Payment Method: {orderInfo.payment_method}</p>
            <p>Status: {orderInfo.status}</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Deliver to" className="shadow h-fit">
            <p>Address: {orderInfo.address}</p>
          </Card>
        </Col>
      </Row>

      <Card title="Products" className="shadow">
        <Table columns={columns} dataSource={products} pagination={false} />
        <div className="flex justify-end mt-4">
          <div className="w-full md:w-1/4">
            <div className="flex justify-between font-semibold text-lg py-1">
              <span>Total:</span>
              <span>{orderInfo.payment}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OrderDetail;
