import { useState, useEffect } from "react";
import {
  Button,
  InputNumber,
  Row,
  Col,
  Divider,
  Typography,
  Rate,
  Input,
} from "antd";
import { PhoneOutlined, MessageOutlined } from "@ant-design/icons";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/Cart/cartSlice";
import ProductAPI from "../api/ProductAPI";
import CommentAPI from "../api/CommentAPI";
import notification from "../notification";

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [value, setValue] = useState("");
  const [comments, setComments] = useState([]);
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await ProductAPI.getProductById(id);
        if (response.data.success) {
          setProduct(response.data.data);
        }
      } catch (error) {
        console.log("Failed to fetch product: ", error);
      }
    }

    async function fetchComments() {
      try {
        const response = await CommentAPI.getCommentsByProduct(id);
        if (response.status === 200) {
          setComments(response.data);
        }
      } catch (error) {
        console.log("Failed to fetch comments: ", error);
      }
    }

    fetchProduct();
    fetchComments();
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

  const handleBuyNow = () => {
    handleAddToCart();
    const productItem = {
      productId: product.productId,
      productName: product.productName,
      image: product.image,
      price: product.price,
      quantity,
    };
    navigate("/payment-method", { state: { cartItems: [productItem] } });
    console.log(productItem);
  };

  const handleAddComment = async () => {
    const commentContent = value.trim();
    if (!commentContent) {
      notification("error", "Nội dung bình luận không được để trống");
      return;
    }

    const commentData = {
      content: commentContent,
      productId: id,
      userId: userId,
    };
    console.log("Adding comment with data:", commentData);
    try {
      const response = await CommentAPI.addComment(commentContent, id, userId);
      console.log(response);
      if (response.status === 200 && response.data) {
        setComments([...comments, response.data]);
        setValue("");
        notification("success", "Đã thêm bình luận thành công");
      } else {
        notification("error", "Có lỗi xảy ra khi thêm bình luận");
        console.error("Error adding comment:", response.data.message);
      }
    } catch (error) {
      console.error(
        "Failed to add comment:",
        error.response ? error.response.data : error.message
      );
      if (error.response && error.response.status === 401) {
        notification("error", "Bạn cần đăng nhập để thêm bình luận");
      } else {
        notification("error", "Có lỗi xảy ra khi thêm bình luận");
      }
    }
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
          <Title level={3}>{product.productName}</Title>
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
            <Button
              type="primary"
              className="w-full mr-2"
              onClick={handleBuyNow}
            >
              MUA NGAY
            </Button>
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
          <Button
            type="primary"
            className="w-full mt-4"
            onClick={handleAddComment}
          >
            GỬI ĐÁNH GIÁ
          </Button>
        </Col>
      </Row>
      <Divider />
      <Title level={4}>Bình luận</Title>
      <Row gutter={[16, 16]}>
        {comments.map((comment) => (
          <Col span={12} key={comment.commentId}>
            <div className="p-4 border rounded">
              <div className="flex items-center justify-start space-x-2">
                <Text strong>
                  {comment.userId ? comment.userId.fullName : "Unknown User"}:
                </Text>
                <Text>{comment.content}</Text>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}
