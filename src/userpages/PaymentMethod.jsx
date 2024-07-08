import { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Radio,
  message,
  Modal,
  List,
  Input,
  Card,
} from "antd";
import { Typography } from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import AccountBalanceTwoToneIcon from "@mui/icons-material/AccountBalanceTwoTone";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import VoucherAPI from "../api/VoucherAPI";
import AddOrderAPI from "../api/OrderAPI";
import PaymentAPI from "../api/PaymentAPI";
import { clearCart } from "../features/Cart/cartSlice";

export default function PaymentMethod() {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [voucherId, setVoucherId] = useState("");
  const [discount, setDiscount] = useState(0);
  const [vouchers, setVouchers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  //eslint-disable-next-line
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    cname: "",
    phone: "",
    address: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = location.state || { cartItems: [] };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleCustomerInfoChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const finalPrice = totalPrice - discount;

  const fetchVouchers = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await VoucherAPI.getByMemberId(userId);
      if (response.success) {
        setVouchers(response.data);
      } else {
        console.error("Failed to fetch vouchers:", response.message);
      }
    } catch (error) {
      console.error("Error fetching vouchers:", error);
    }
  };

  useEffect(() => {
    if (isModalVisible) {
      fetchVouchers();
    }
  }, [isModalVisible]);

  useEffect(() => {
    console.log(vouchers);
  }, [vouchers]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleVoucherSelect = (voucher) => {
    setSelectedVoucher(voucher);
    setVoucherId(voucher.voucherId);
    setDiscount(totalPrice * voucher.discount);
    setIsModalVisible(false);
    message.success(`Voucher applied. Discount: ${voucher.discount * 100}%`);
  };

  const validateCustomerInfo = () => {
    const { cname, phone, address, email } = customerInfo;
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[a-zA-Z][a-zA-Z0-9._%+-]*@gmail\.[a-zA-Z]{2,}$/;
    const newErrors = {};

    if (!cname) {
      newErrors.cname = "Customer name is required";
    }

    if (!phone || !phoneRegex.test(phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!address) {
      newErrors.address = "Address is required";
    }

    if (!email || !emailRegex.test(email)) {
      newErrors.email =
        "Email must be a valid Gmail address and should not start with a digit";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const redirectToVnPay = async (orderId) => {
    const bankCode = "NCB";
    try {
      const paymentUrl = await PaymentAPI.redirectToVnPay(orderId, bankCode);
      window.location.href = paymentUrl;
    } catch (error) {
      message.error("Failed to initiate VNPay payment");
    }
  };

  const onCompleteOrder = async () => {
    if (!validateCustomerInfo()) {
      return;
    }

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      message.error("Please log in to continue.");
      return;
    }

    const orderDetails = cartItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));

    const orderData = {
      order: {
        ...customerInfo,
        payment_method: paymentMethod,
        voucherId: voucherId || null,
      },
      orderDetails,
    };

    try {
      const response = await AddOrderAPI.createOrderWithDetails(orderData);
      if (response.data.success) {
        message.success("Order created successfully");
        dispatch(clearCart());
        const orderId = response.data.data.orderId;
        if (paymentMethod === "vnpay") {
          localStorage.setItem("orderData", JSON.stringify(orderData));
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
          localStorage.setItem("discount", JSON.stringify(discount));
          localStorage.setItem("finalPrice", JSON.stringify(finalPrice));
          redirectToVnPay(orderId);
        } else {
          navigate("/payment-success", {
            state: { orderData, cartItems, discount, finalPrice },
          });
        }
      } else {
        message.error(response.data.message || "Failed to create order");
      }
    } catch (error) {
      console.error("Failed to create order:", error);
      message.error("Failed to create order");
    }
  };

  const handleVnPayResponse = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const vnp_ResponseCode = urlParams.get("vnp_ResponseCode");
    const vnp_OrderInfo = urlParams.get("vnp_OrderInfo");
    if (vnp_ResponseCode && vnp_OrderInfo) {
      const response = await PaymentAPI.sendToDatabase(
        vnp_OrderInfo,
        vnp_ResponseCode
      );
      window.history.pushState({}, document.title, window.location.pathname);
      if (response.code === "00") {
        message.success("Payment successful");
        const orderData = JSON.parse(localStorage.getItem("orderData"));
        const cartItems = JSON.parse(localStorage.getItem("cartItems"));
        const discount = JSON.parse(localStorage.getItem("discount"));
        const finalPrice = JSON.parse(localStorage.getItem("finalPrice"));
        localStorage.removeItem("orderData");
        localStorage.removeItem("cartItems");
        localStorage.removeItem("discount");
        localStorage.removeItem("finalPrice");
        navigate("/payment-success", {
          state: { orderData, cartItems, discount, finalPrice },
        });
      } else {
        message.error("Payment failed");
      }
    }
  };

  useEffect(() => {
    handleVnPayResponse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex justify-center p-4">
      <div className="w-5/6 flex">
        <div className="w-1/2 p-4 bg-white shadow-lg rounded-lg mr-4">
          <img
            src="/assets/images/Song long diamond.png"
            alt="Song long Diamond"
            className="w-50 m-2"
          />
          <Typography variant="h6" className="mb-4 w-fit">
            Phương thức vận chuyển
          </Typography>
          <Radio.Group value="delivery" className="mb-4">
            <div className="flex justify-between items-center border p-2 rounded w-full h-14">
              <Radio value="delivery">Giao hàng tận nơi</Radio>
              <Typography variant="body2" className="ml-6">
                0đ
              </Typography>
            </div>
          </Radio.Group>
          <Divider />
          <Typography variant="h6" className="mb-4">
            Phương thức thanh toán
          </Typography>
          <Radio.Group
            onChange={handlePaymentMethodChange}
            value={paymentMethod}
            className="mb-4 my-4"
          >
            <div className="flex justify-between items-center border p-2 rounded w-full h-14">
              <Radio value="cod">
                <LocalShippingOutlinedIcon />
                Thanh toán khi giao hàng (COD)
              </Radio>
            </div>
            <div className="flex justify-between items-center border p-2 rounded w-full h-14 my-4">
              <Radio value="vnpay">
                <AccountBalanceTwoToneIcon />
                Chuyển khoản qua VNPay
              </Radio>
            </div>
          </Radio.Group>
          <Divider />
          <Typography variant="h6" className="mb-4">
            Thông tin khách hàng
          </Typography>
          <div className="mb-4">
            <Input
              type="text"
              name="cname"
              placeholder="Tên khách hàng"
              className="w-full"
              value={customerInfo.cname}
              onChange={handleCustomerInfoChange}
            />
            {errors.cname && (
              <Typography variant="body2" className="text-red-500">
                {errors.cname}
              </Typography>
            )}
          </div>
          <div className="mb-4">
            <Input
              type="text"
              name="phone"
              placeholder="Số điện thoại"
              className="w-full"
              value={customerInfo.phone}
              onChange={handleCustomerInfoChange}
            />
            {errors.phone && (
              <Typography variant="body2" className="text-red-500">
                {errors.phone}
              </Typography>
            )}
          </div>
          <div className="mb-4">
            <Input
              type="text"
              name="address"
              placeholder="Địa chỉ"
              className="w-full"
              value={customerInfo.address}
              onChange={handleCustomerInfoChange}
            />
            {errors.address && (
              <Typography variant="body2" className="text-red-500">
                {errors.address}
              </Typography>
            )}
          </div>
          <div className="mb-4">
            <Input
              type="text"
              name="email"
              placeholder="Email"
              className="w-full"
              value={customerInfo.email}
              onChange={handleCustomerInfoChange}
            />
            {errors.email && (
              <Typography variant="body2" className="text-red-500">
                {errors.email}
              </Typography>
            )}
          </div>
          <div className="flex justify-between">
            <Button type="link">Giỏ hàng</Button>
            <Button
              type="primary"
              className="bg-blue-500 text-white w-full h-10 mr-3"
              onClick={onCompleteOrder}
            >
              Hoàn tất đơn hàng
            </Button>
          </div>
        </div>
        <Card className="w-1/2 ml-4">
          {cartItems.map((item) => (
            <div
              key={`${item.id}-${item.code}-${item.price}-${item.quantity}`}
              className="flex justify-between items-center mb-2"
            >
              <img src={item.image} alt="Product" className="w-16 h-16" />
              <div className="flex-1 ml-4">
                <p className="w-44">{item.productName}</p>
                <p className="text-gray-500 w-20">Quantity: {item.quantity}</p>
              </div>
              <p>{item.price.toLocaleString()}đ</p>
            </div>
          ))}
          <div className="border-b my-4"></div>
          <div className="flex justify-between mb-2">
            <Button
              className="w-full p-2 bg-blue-500 rounded h-10 text-white"
              onClick={showModal}
            >
              Chọn mã giảm giá
            </Button>
          </div>
          <div className="border-b my-4"></div>
          <div className="flex justify-between mb-2">
            <p>Tạm tính</p>
            <p>{totalPrice.toLocaleString()}đ</p>
          </div>
          <div className="flex justify-between mb-2">
            <p>Giảm giá</p>
            <p>{discount.toLocaleString()}đ</p>
          </div>
          <div className="flex justify-between mb-2">
            <p>Phí vận chuyển</p>
            <p>0đ</p>
          </div>
          <div className="border-b my-4"></div>
          <div className="flex justify-between mb-2">
            <p className="text-xl font-bold">Tổng cộng</p>
            <p className="text-xl font-bold">{finalPrice.toLocaleString()}đ</p>
          </div>
        </Card>
      </div>
      <Modal
        title="Chọn mã giảm giá"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <List
          itemLayout="horizontal"
          dataSource={vouchers || []}
          renderItem={(voucher) => (
            <List.Item
              key={voucher.voucherId} // Adjusted to use voucherId
              actions={[
                <Button
                  key={`select-${voucher.voucherId}`} // Adjusted to use voucherId
                  type="primary"
                  onClick={() => handleVoucherSelect(voucher)}
                >
                  Chọn
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={`Voucher ID: ${voucher.voucherId}`} // Adjusted to use voucherId
                description={`Discount: ${voucher.discount * 100}%`} // Adjusted to use discount
              />
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
}