// import React from "react";
import { Card, Col, Row, Table, Button, Typography } from "antd";
import { DownloadOutlined, ProfileOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

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
            <Title level={4}>Orders ID: 001</Title>
            <Text>Feb 16, 2022 - Feb 20, 2022</Text>
          </Col>
          <Col>
            <Text>Status: Completed</Text>
          </Col>
        </Row>
      </Card>

      <Row gutter={16} className="mb-6">
        <Col span={8}>
          <Card
            title="Customer"
            extra={
              <Link
                to="/staff/management-user/user-detail/:id"
                type="link"
                icon={<ProfileOutlined />}
              >
                View Profile
              </Link>
            }
            className="shadow"
          >
            <p>Full Name: Shristi Singh</p>
            <p>Email: shristi@gmail.com</p>
            <p>Phone: +91 904 231 1212</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="Order Info"
            extra={
              <Button type="link" icon={<DownloadOutlined />}>
                View Order
              </Button>
            }
            className="shadow"
          >
            <p>Shipping: COD</p>
            <p>Payment Method: VN PAY</p>
            <p>Status: Completed</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Deliver to" className="shadow">
            <p>Address: Dharam Colony, Palam Vihar, Gurgaon, Haryana</p>
          </Card>
        </Col>
      </Row>

      <Row gutter={16} className="mb-6">
        <Col span={12}>
          <Card title="Payment Info" className="shadow">
            <p>VN PAY: **** 6557</p>
            <p>Phone: +91 904 231 1212</p>
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
