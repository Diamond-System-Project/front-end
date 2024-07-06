import { useEffect } from "react";
import { Button, Divider, InputNumber } from "antd";
import { Typography } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../features/Cart/cartSlice";
import notification from "../notification";
export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleQuantityChange = (item, quantity) => {
    dispatch(updateCartItemQuantity({ ...item, quantity }));
  };

  const handleProceedToCheckout = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      notification(
        "warning",
        "Bạn phải đăng nhập trước khi tiến hành thanh toán."
      );
    } else {
      navigate("/payment-method", { state: { cartItems } });
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discount = 0;
  const finalPrice = totalPrice - discount;

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="cart p-4 bg-white shadow-lg rounded-lg w-3/4">
        <nav className="mb-4">
          <ol className="list-reset flex text-gray-700 ml-2">
            <li>
              <a href="/" className="text-blue-500">
                Trang Chủ
              </a>
            </li>
            <li>
              <span className="mx-2">
                <KeyboardArrowRightIcon />
              </span>
            </li>
            <li>
              <a href="/checkout" className="text-gray-500">
                Giỏ Hàng
              </a>
            </li>
          </ol>
        </nav>
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h5">
            GIỎ HÀNG ({cartItems.length} sản phẩm)
          </Typography>
          <Button type="link">TIẾP TỤC MUA HÀNG</Button>
        </div>
        {cartItems.length > 0 ? (
          <div className="flex justify-between">
            <div className="w-2/3">
              {cartItems.map((item) => (
                <div
                  className="cart-item flex mb-4"
                  key={`${item.id}-${item.code}-${item.price}-${item.quantity}`}
                >
                  <img src={item.image} alt={item.name} className="w-36 h-36" />
                  <div className="item-details ml-4">
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body2">
                      MSP: {item.productName}
                    </Typography>
                    <Typography variant="body2">Price: {item.price}</Typography>
                    <div className="quantity flex items-center my-2">
                      <Typography variant="body2" className="mr-2">
                        Số lượng:{" "}
                      </Typography>
                      <InputNumber
                        min={1}
                        value={item.quantity}
                        onChange={(value) => handleQuantityChange(item, value)}
                        className="ml-1 w-14"
                      />
                    </div>
                    <div className="flex mt-2">
                      <Button onClick={() => handleRemoveFromCart(item)}>
                        Xóa
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="summary w-1/3">
              <Typography variant="h6" className="mb-2">
                Tổng tiền
              </Typography>
              <Divider />
              <div className="flex justify-between">
                <Typography variant="body2">Tạm tính:</Typography>
                <Typography variant="body2">
                  {totalPrice.toLocaleString()}đ
                </Typography>
              </div>
              <Divider />
              <div className="flex justify-between">
                <Typography variant="body2">Giảm giá:</Typography>
                <Typography variant="body2">
                  {discount.toLocaleString()}đ
                </Typography>
              </div>
              <Divider />
              <div className="flex justify-between">
                <Typography variant="body2">Vận chuyển:</Typography>
                <Typography variant="body2">Miễn phí vận chuyển</Typography>
              </div>
              <Divider />
              <div className="flex justify-between">
                <Typography variant="body2">Thành tiền:</Typography>
                <Typography variant="body2">
                  {finalPrice.toLocaleString()}đ
                </Typography>
              </div>
              <Button
                type="primary"
                className="w-full mt-2 bg-blue-500 h-[50px]"
                onClick={handleProceedToCheckout}
              >
                TIẾN HÀNH ĐẶT HÀNG
              </Button>
            </div>
          </div>
        ) : (
          <div className="h-[50vh]">
            <Typography variant="h6" className="my-10">
              Giỏ hàng không có sản phẩm
            </Typography>
            <Button type="primary" className="w-fit my-10 bg-red-500 h-[50px]">
              Tiếp tục mua hàng
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
