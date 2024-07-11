import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Table,
  Button,
  message,
  Modal,
  Row,
  Col,
  Typography,
  Card,
} from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import OrderDetailAPI from "../api/OrderDetailAPI";
import CertificateAPI from "../api/CertificateAPI";
import WarrantyAPI from "../api/WarrantyAPI";

const { Title, Text } = Typography;

export default function OrderDetails() {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCertificateModalVisible, setIsCertificateModalVisible] =
    useState(false);
  const [certificateData, setCertificateData] = useState(null);
  const [isWarrantyModalVisible, setIsWarrantyModalVisible] = useState(false);
  const [warrantyData, setWarrantyData] = useState(null);

  const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND";
  };

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await OrderDetailAPI.getOrderDetailsByOrderId(id);
        if (response.data.success) {
          const fetchedDetails = response.data.data;
          const formattedDetails = fetchedDetails.map((detail) => ({
            key: detail.orderDetailId,
            productName: detail.productId.productName,
            quantity: detail.quantity,
            totalPrice: formatCurrency(detail.price),
          }));
          setOrderDetails(formattedDetails);
        } else {
          message.error(
            "Failed to fetch order details: " + response.data.message
          );
        }
      } catch (error) {
        message.error("Failed to fetch order details: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  const handleSendCertificate = async (diamondId) => {
    if (!diamondId) {
      message.error("Invalid diamond ID");
      return;
    }
    try {
      const response = await CertificateAPI.getByDiamondId(diamondId);
      if (response.data.success) {
        setCertificateData(response.data.data);
        setIsCertificateModalVisible(true);
      } else {
        message.error("Failed to fetch certificate: " + response.data.message);
      }
    } catch (error) {
      message.error("Failed to fetch certificate: " + error.message);
    }
  };

  const handleSendWarranty = async (orderDetailId) => {
    if (!orderDetailId) {
      message.error("Invalid order detail ID");
      return;
    }
    try {
      const response = await WarrantyAPI.getByOrderDetailId(orderDetailId);
      if (response.data.success) {
        setWarrantyData(response.data.data);
        setIsWarrantyModalVisible(true);
      } else {
        message.error("Failed to fetch warranty: " + response.data.message);
      }
    } catch (error) {
      message.error("Failed to fetch warranty: " + error.message);
    }
  };

  const handleCancelCertificate = () => {
    setIsCertificateModalVisible(false);
    setCertificateData(null);
  };

  const handleCancelWarranty = () => {
    setIsWarrantyModalVisible(false);
    setWarrantyData(null);
  };

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Thành tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div className="flex space-x-2">
          <Button type="link" onClick={() => handleSendCertificate(record.key)}>
            Gửi chứng nhận
          </Button>
          <Button type="link" onClick={() => handleSendWarranty(record.key)}>
            Giấy bảo hành
          </Button>
          <Button type="link">Liên hệ</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center my-10">
      <div className="w-full max-w-6xl">
        <h1 className="text-3xl justify-center flex w-full font-bold mb-4">
          Chi tiết đơn hàng
        </h1>
        <Table
          columns={columns}
          dataSource={orderDetails}
          loading={loading}
          pagination={false}
        />
      </div>
      <Modal
        title="Chi tiết chứng nhận"
        visible={isCertificateModalVisible}
        onCancel={handleCancelCertificate}
        width={1000}
        footer={[
          <Button key="close" onClick={handleCancelCertificate}>
            Close
          </Button>,
        ]}
      >
        {certificateData ? (
          <Card
            bordered={false}
            style={{ background: "#FCE7F3", padding: "20px" }}
          >
            <Row justify="center" style={{ marginBottom: "20px" }}>
              <img
                src="src/assets/images/Songlong.png"
                alt="Logo"
                style={{ width: "100px", marginBottom: "20px" }}
              />
            </Row>
            <Row
              justify="center"
              className="flex justify-center items-center"
              style={{ marginBottom: "20px" }}
            >
              <CheckCircleOutlined
                style={{ fontSize: "30px", color: "#52c41a" }}
              />
              <Title level={3} style={{ marginLeft: "10px" }}>
                Certificate
              </Title>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Text strong>Diamond Name:</Text>{" "}
                <Text>{certificateData?.diamondId?.diamondName}</Text>
              </Col>
              <Col span={12}>
                <Text strong>Origin:</Text>{" "}
                <Text>{certificateData?.diamondId?.origin}</Text>
              </Col>
              <Col span={12}>
                <Text strong>Carat Weight:</Text>{" "}
                <Text>{certificateData?.diamondId?.caratWeight}</Text>
              </Col>
              <Col span={12}>
                <Text strong>Color:</Text>{" "}
                <Text>{certificateData?.diamondId?.color}</Text>
              </Col>
              <Col span={12}>
                <Text strong>Clarity:</Text>{" "}
                <Text>{certificateData?.diamondId?.clarity}</Text>
              </Col>
              <Col span={12}>
                <Text strong>Cut:</Text>{" "}
                <Text>{certificateData?.diamondId?.cut}</Text>
              </Col>
              <Col span={12}>
                <Text strong>Shape:</Text>{" "}
                <Text>{certificateData?.diamondId?.shape}</Text>
              </Col>
              <Col span={12}>
                <Text strong>Base Price:</Text>{" "}
                <Text>
                <Text>{formatCurrency(certificateData?.diamondId?.basePrice)}</Text>
                </Text>
              </Col>
              <Col span={12}>
                <Text strong>Certificate Number:</Text>{" "}
                <Text>{certificateData?.number}</Text>
              </Col>
              <Col span={12}>
                <Text strong>Shape Cut:</Text>{" "}
                <Text>{certificateData?.shapeCut}</Text>
              </Col>
              <Col span={24}>
                <Text strong>Description:</Text>{" "}
                <Text>{certificateData?.description}</Text>
              </Col>
              <Col span={12}>
                <Text strong>Measurements:</Text>{" "}
                <Text>{certificateData?.measure}</Text>
              </Col>
              <Col span={12}>
                <Text strong>Polish:</Text>{" "}
                <Text>{certificateData?.polish}</Text>
              </Col>
              <Col span={12}>
                <Text strong>Symmetry:</Text>{" "}
                <Text>{certificateData?.symmetry}</Text>
              </Col>
              <Col span={12}>
                <Text strong>Issuer:</Text>{" "}
                <Text>{certificateData?.issuer}</Text>
              </Col>
              <Col span={24}>
                <Text strong>Issued Date:</Text>{" "}
                <Text>{certificateData?.issued_date}</Text>
              </Col>
            </Row>
          </Card>
        ) : (
          <p>Loading...</p>
        )}
      </Modal>
      <Modal
        title="Chi tiết bảo hành"
        visible={isWarrantyModalVisible}
        onCancel={handleCancelWarranty}
        width={1000}
        footer={[
          <Button key="close" onClick={handleCancelWarranty}>
            Close
          </Button>,
        ]}
      >
        {warrantyData ? (
          <Card
            bordered={false}
            style={{ background: "#E3F2FD", padding: "20px" }}
          >
            <Row justify="center" style={{ marginBottom: "20px" }}>
              <img
                src="src/assets/images/Songlong.png"
                alt="Logo"
                style={{ width: "100px", marginBottom: "20px" }}
              />
            </Row>
            <Row
              justify="center"
              className="flex justify-center items-center"
              style={{ marginBottom: "20px" }}
            >
              <CheckCircleOutlined
                style={{ fontSize: "30px", color: "#1976D2" }}
              />
              <Title level={3} style={{ marginLeft: "10px" }}>
                Warranty Details
              </Title>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Text strong>Warranty ID:</Text>{" "}
                <Text>{warrantyData?.warrantyId}</Text>
              </Col>
              <Col span={12}>
                <Text strong>Warranty Length:</Text>{" "}
                <Text>{warrantyData?.warrantyLength}</Text>
              </Col>
              <Col span={12}>
                <Text strong>Start Date:</Text>{" "}
                <Text>{warrantyData?.startDate}</Text>
              </Col>
              <Col span={12}>
                <Text strong>End Date:</Text>{" "}
                <Text>{warrantyData?.endDate}</Text>
              </Col>
              <Col span={12}>
                <Text strong>Status:</Text> <Text>{warrantyData?.status}</Text>
              </Col>
              <Col span={12}>
                <Text strong>Product Name:</Text>{" "}
                <Text>
                  {warrantyData?.orderDetailId?.productId?.productName}
                </Text>
              </Col>
              <Col span={24}>
                <Text strong>Description:</Text>{" "}
                <Text>
                  {warrantyData?.orderDetailId?.productId?.description}
                </Text>
              </Col>
            </Row>
          </Card>
        ) : (
          <p>Loading...</p>
        )}
      </Modal>
    </div>
  );
}
