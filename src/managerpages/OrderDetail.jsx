import { Card, Col, Row, Table, Typography } from "antd";

const { Title, Text } = Typography;

const OrderDetail = () => {
  const data = [
    {
      key: "1",
      productName: "Lorem Ipsum",
      quantity: 2,
      total: "$40",
    },
    {
      key: "2",
      productName: "Lorem Ipsum",
      quantity: 2,
      total: "$40",
    },
    {
      key: "3",
      productName: "Lorem Ipsum",
      quantity: 2,
      total: "$40",
    },
    {
      key: "4",
      productName: "Lorem Ipsum",
      quantity: 2,
      total: "$40",
    },
  ];

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
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
  ];

  return (
    <div className="p-6 bg-gray-100">
      <Card className="mb-6 shadow">
        <Row gutter={16} justify="space-between" align="middle">
          <Col>
            <Title level={4}>Order ID: </Title>
            <Text>Date:</Text>
          </Col>
          <Col>
            <Text>Status: Completed</Text>
          </Col>
        </Row>
      </Card>

      <Row gutter={16} className="mb-6 h-fit">
        <Col span={8}>
          <Card title="Customer" className="shadow">
            <p>Full Name: </p>
            <p>Email: </p>
            <p>Phone: </p>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Order Info" className="shadow">
            <p>Shipping: Delivery</p>
            <p>Payment Method: VN PAY / COD</p>
            <p>Status: </p>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Deliver to" className="shadow h-fit">
            <p>Address: </p>
          </Card>
        </Col>
      </Row>

      <Card title="Products" className="shadow">
        <Table columns={columns} dataSource={data} pagination={false} />
        <div className="flex justify-end mt-4">
          <div className="w-full md:w-1/4">
            <div className="flex justify-between py-1">
              <span>Subtotal:</span>
              <span>$40</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Tax (20%):</span>
              <span>$40</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Discount:</span>
              <span>$40</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Shipping Rate:</span>
              <span>$40</span>
            </div>
            <div className="flex justify-between font-semibold text-lg py-1">
              <span>Total:</span>
              <span>$40</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OrderDetail;
