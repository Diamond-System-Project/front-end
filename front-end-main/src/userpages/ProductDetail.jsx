import React, { useState } from "react";
import {
  Button,
  InputNumber,
  Row,
  Col,
  Divider,
  Typography,
  Rate,
  Input,
  Upload,
  Card,
  Badge,
} from "antd";
import {
  PhoneOutlined,
  MessageOutlined,
  InfoCircleOutlined,
  CameraOutlined,
} from "@ant-design/icons";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/Cart/cartSlice";

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function ProductDetail() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const RelatedProducts = [
    {
      id: 1,
      name: "Bông tai kim cương",
      code: "AFEB902073F2HM1",
      price: "40,480,000₫",
      oldPrice: "",
      image: "https://via.placeholder.com/150",
      badge: "MỚI",
    },
    {
      id: 2,
      name: "Bông tai kim cương",
      code: "AFEB002079F2HM1",
      price: "36,828,000₫",
      oldPrice: "40,920,000₫",
      image: "https://via.placeholder.com/150",
      badge: "-10%",
    },
    {
      id: 3,
      name: "Nhẫn nữ 14K",
      code: "AFRB000147F2HA1",
      price: "40,930,000₫",
      oldPrice: "",
      image: "https://via.placeholder.com/150",
      badge: "",
    },
    {
      id: 4,
      name: "Bông tai kim cương",
      code: "AFEB002074F2HM1",
      price: "41,090,000₫",
      oldPrice: "",
      image: "https://via.placeholder.com/150",
      badge: "",
    },
    {
      id: 5,
      name: "Nhẫn nữ 18K",
      code: "AFRB002004D2DA1",
      price: "41,110,000₫",
      oldPrice: "",
      image: "https://via.placeholder.com/150",
      badge: "",
    },
    {
      id: 6,
      name: "Bông tai kim cương",
      code: "AFEB902080F2HM1",
      price: "42,050,000₫",
      oldPrice: "",
      image: "https://via.placeholder.com/150",
      badge: "MỚI",
    },
    {
      id: 7,
      name: "Nhẫn nữ 18K",
      code: "AFRB002360D3DA1",
      price: "42,300,000₫",
      oldPrice: "",
      image: "https://via.placeholder.com/150",
      badge: "",
    },
    {
      id: 8,
      name: "Nhẫn nữ 14K",
      code: "AFRB000131F2HA1",
      price: "38,079,000₫",
      oldPrice: "42,310,000₫",
      image: "https://via.placeholder.com/150",
      badge: "-10%",
    },
  ];

  const handleAddToCart = (product) => {
    const productToSave = {
      ...product,
      price: product.price ? product.price.replace(/[^0-9]/g, "") : "0",
    };
    dispatch(addToCart({ product: productToSave }));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex">
        <div className="w-1/2 p-4">
          <img
            src="https://via.placeholder.com/300"
            alt="Product"
            className="w-full"
          />
          <div className="flex justify-center mt-4">
            <img
              src="https://via.placeholder.com/80"
              alt="Thumbnail"
              className="w-20 h-20 mx-2"
            />
            <img
              src="https://via.placeholder.com/80"
              alt="Thumbnail"
              className="w-20 h-20 mx-2"
            />
          </div>
        </div>
        <div className="w-1/2 p-4">
          <Title level={3}>MẶT DÂY KIM CƯƠNG AFPB000040F2HA1</Title>
          <Text type="secondary">Mã sản phẩm: AFPB000040F2HA1</Text>
          <div className="my-2">
            <Title level={2} className="text-red-500">
              41,454,000₫
            </Title>
            <Text delete>46,060,000₫</Text>
          </div>
          <div className="my-2">
            <Text>
              Giá có thể thay đổi tuỳ thuộc vào kích thước và trọng lượng thực
              tế của sản phẩm. Vui lòng gọi 1800 1168 để được hỗ trợ.
            </Text>
          </div>
          <div className="my-2">
            <Text strong>
              <CheckCircleIcon className="text-green-500" /> CÒN 5 SẢN PHẨM
            </Text>
          </div>
          <div className="my-4 flex items-center justify-between">
            <Text>Số lượng:</Text>
            <InputNumber min={1} max={10} defaultValue={1} className="ml-2" />
            <a href="/size-guide" className="text-blue-500 ml-4">
              Hướng dẫn đo size →
            </a>
          </div>
          <div className="my-4 flex items-center justify-between">
            <Link to="/payment-method" className="w-full mr-2">
              <Button type="primary" className="w-full">
                MUA NGAY
              </Button>
            </Link>
            <Button
              onClick={() => handleAddToCart(RelatedProducts)}
              className="w-full ml-2"
            >
              THÊM VÔ GIỎ HÀNG
            </Button>
          </div>
          <div className="my-4 flex items-center justify-between">
            <Link to="/hotline" className="w-full mr-2">
              <Button icon={<PhoneOutlined />} className="w-full">
                HOTLINE: 1800 1168
              </Button>
            </Link>
            <Button icon={<MessageOutlined />} className="ml-2 w-full">
              CHAT VỚI TƯ VẤN VIÊN
            </Button>
          </div>
        </div>
      </div>
      <Divider />
      <Title level={4}>CHI TIẾT SẢN PHẨM</Title>
      <Row gutter={16}>
        <Col span={12}>
          <div>
            <Text strong>Loại sản phẩm:</Text> Mặt dây
          </div>
          <div>
            <Text strong>Màu:</Text> Vàng trắng
          </div>
          <Divider />
          <div>
            <Text strong>Hình dáng:</Text> Round
          </div>
          <div>
            <Text strong>Chế tác:</Text> Excellent{" "}
            <InfoCircleOutlined className="text-red-500" />
          </div>
          <div>
            <Text strong>Độ tinh khiết:</Text> VS2{" "}
            <InfoCircleOutlined className="text-red-500" />
          </div>
          <div>
            <Text strong>Độ bóng:</Text> EX{" "}
            <InfoCircleOutlined className="text-red-500" />
          </div>
          <div>
            <Text strong>Thắt lưng:</Text> Medium, Faceted, 3.0%
          </div>
          <div>
            <Text strong>Phát quang:</Text> FNT{" "}
            <InfoCircleOutlined className="text-red-500" />
          </div>
        </Col>
        <Col span={12}>
          <div>
            <Text strong>Đá chính:</Text> Kim cương 8 Hearts & 8 Arrows
          </div>
          <div>
            <Text strong>Chất liệu:</Text> Vàng 14k
          </div>
          <Divider />
          <div>
            <Text strong>Trọng lượng (cts):</Text> 0.46{" "}
            <InfoCircleOutlined className="text-red-500" />
          </div>
          <div>
            <Text strong>Cấp màu:</Text> D{" "}
            <InfoCircleOutlined className="text-red-500" />
          </div>
          <div>
            <Text strong>Kiểm định:</Text> GIA
          </div>
          <div>
            <Text strong>Kích thước (mm):</Text> 4.4{" "}
            <InfoCircleOutlined className="text-red-500" />
          </div>
          <div>
            <Text strong>Tim đáy:</Text> None
          </div>
          <div>
            <Text strong>Độ đối xứng:</Text> EX{" "}
            <InfoCircleOutlined className="text-red-500" />
          </div>
        </Col>
      </Row>
      <Divider />
      <Title level={4}>ĐÁNH GIÁ</Title>
      <div className="my-4 flex items-center">
        <Text>Chọn đánh giá của bạn</Text>
        <Rate className="ml-2" />
      </div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <TextArea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Viết đánh giá của bạn..."
            autoSize={{ minRows: 4, maxRows: 4 }}
          />
          <Upload>
            <Button
              icon={<CameraOutlined />}
              type="link"
              style={{ color: "red" }}
            >
              Đính kèm ảnh
            </Button>
          </Upload>
        </Col>
        <Col span={12}>
          <Input placeholder="Họ và tên *" className="mb-4" />
          <Input placeholder="Điện thoại *" className="mt-4" />
        </Col>
        <Col span={12}>
          <Input placeholder="Email *" className="mb-4" />
          <Button type="primary" className="w-full mt-4">
            GỬI ĐÁNH GIÁ
          </Button>
        </Col>
      </Row>
      <Divider />
      <Title level={4}>SẢN PHẨM CÙNG LOẠI</Title>
      <Row gutter={[16, 16]}>
        {RelatedProducts.map((product) => (
          <Col span={6} key={product.id}>
            <Badge.Ribbon
              text={product.badge}
              color={product.badge === "MỚI" ? "red" : "volcano"}
            >
              <Card
                hoverable
                cover={<img alt={product.name} src={product.image} />}
              >
                <Card.Meta title={product.name} description={product.code} />
                <div className="mt-2">
                  <Text strong style={{ color: "red" }}>
                    {product.price}
                  </Text>
                  {product.oldPrice && (
                    <Text delete className="ml-2">
                      {product.oldPrice}
                    </Text>
                  )}
                </div>
              </Card>
            </Badge.Ribbon>
          </Col>
        ))}
      </Row>
    </div>
  );
}
