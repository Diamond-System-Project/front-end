import React, { useState, useEffect } from "react";
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
  message,
} from "antd";
import {
  PhoneOutlined,
  MessageOutlined,
  InfoCircleOutlined,
  CameraOutlined,
} from "@ant-design/icons";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/Cart/cartSlice";
import ProductAPI from "../api/ProductAPI";
import notification from "../notification";
const { Title, Text } = Typography;
const { TextArea } = Input;

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await ProductAPI.getProductById(id);

        if (response.data.success) {
          setProduct(response.data.data);
        }
      } catch (error) {}
    }
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    const price = product.price
      ? String(product.price).replace(/[^0-9]/g, "")
      : "0";
    const productToSave = {
      ...product,
      price,
      quantity,
    };
    dispatch(addToCart(productToSave));
    notification("success", "Đã thêm vào giỏ hàng thành công");
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex">
        <div className="w-1/2 p-4">
          <div className="relative flex justify-center">
            <img src={product.image ?? ""} alt="Product" className="w-1/2" />
          </div>
        </div>
        <div className="w-1/2 p-4">
          <Title level={3}>{product.name}</Title>
          <Text type="secondary">Mã sản phẩm: {product.code}</Text>
          <div className="my-2">
            <Title level={2} className="text-red-500">
              {product.price}
            </Title>
            {product.oldPrice && <Text delete>{product.oldPrice}</Text>}
          </div>
          <div className="my-2">
            <Text>{product.description}</Text>
          </div>
          <div className="my-2">
            <Text strong>
              <CheckCircleIcon className="text-green-500" /> CÒN {product.stock}{" "}
              SẢN PHẨM
            </Text>
          </div>
          <div className="my-4 flex items-center justify-between">
            <Text>Số lượng:</Text>
            <InputNumber
              min={1}
              max={product.stock}
              value={quantity}
              onChange={(value) => setQuantity(value)}
              className="ml-2"
            />
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
            <Button onClick={handleAddToCart} className="w-full ml-2">
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
      {/* <Divider />
      <Title level={4}>CHI TIẾT SẢN PHẨM</Title>
      <Row gutter={16}>
        <Col span={12}>
          <div><Text strong>Loại sản phẩm:</Text> {product.category}</div>
          <div><Text strong>Màu:</Text> {product.color}</div>
          <Divider />
          <div><Text strong>Hình dáng:</Text> {product.shape}</div>
          <div><Text strong>Chế tác:</Text> {product.craftsmanship} <InfoCircleOutlined className="text-red-500" /></div>
          <div><Text strong>Độ tinh khiết:</Text> {product.clarity} <InfoCircleOutlined className="text-red-500" /></div>
          <div><Text strong>Độ bóng:</Text> {product.polish} <InfoCircleOutlined className="text-red-500" /></div>
          <div><Text strong>Thắt lưng:</Text> {product.girdle}</div>
          <div><Text strong>Phát quang:</Text> {product.fluorescence} <InfoCircleOutlined className="text-red-500" /></div>
        </Col>
        <Col span={12}>
          <div><Text strong>Đá chính:</Text> {product.mainStone}</div>
          <div><Text strong>Chất liệu:</Text> {product.material}</div>
          <Divider />
          <div><Text strong>Trọng lượng (cts):</Text> {product.carat} <InfoCircleOutlined className="text-red-500" /></div>
          <div><Text strong>Cấp màu:</Text> {product.colorGrade} <InfoCircleOutlined className="text-red-500" /></div>
          <div><Text strong>Kiểm định:</Text> {product.certification}</div>
          <div><Text strong>Kích thước (mm):</Text> {product.size} <InfoCircleOutlined className="text-red-500" /></div>
          <div><Text strong>Tim đáy:</Text> {product.culet}</div>
          <div><Text strong>Độ đối xứng:</Text> {product.symmetry} <InfoCircleOutlined className="text-red-500" /></div>
        </Col>
      </Row> */}
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
        <Button type="primary" className="w-full mt-4">
          GỬI ĐÁNH GIÁ
        </Button>
      </Row>
      <Divider />
      <Title level={4}>SẢN PHẨM CÙNG LOẠI</Title>
      <Row gutter={[16, 16]}>
        {product.relatedProducts?.map((relatedProduct) => (
          <Col span={6} key={relatedProduct.id}>
            <Badge.Ribbon
              text={relatedProduct.badge}
              color={relatedProduct.badge === "MỚI" ? "red" : "volcano"}
            >
              <Card
                hoverable
                cover={
                  <img alt={relatedProduct.name} src={relatedProduct.image} />
                }
              >
                <Card.Meta
                  title={relatedProduct.name}
                  description={relatedProduct.code}
                />
                <div className="mt-2">
                  <Text strong style={{ color: "red" }}>
                    {relatedProduct.price}
                  </Text>
                  {relatedProduct.oldPrice && (
                    <Text delete className="ml-2">
                      {relatedProduct.oldPrice}
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
