import React, { useEffect } from 'react';
import { Button, Divider } from 'antd';
import { Card } from "antd";
import CheckCircleOutlineTwoToneIcon from '@mui/icons-material/CheckCircleOutlineTwoTone';
import { useLocation } from 'react-router-dom';

export default function PaymentSuccess() {
    const location = useLocation();
    const { orderData, cartItems, discount, finalPrice } = location.state || {};

    useEffect(() => {
        const { orderData, cartItems, discount, finalPrice } = location.state || {};
        console.log(orderData);
        console.log(cartItems);
        console.log(discount);
        console.log(finalPrice);
    }, []);

    return (
      <div className="flex justify-center p-4">
        <div className="w-5/6 flex">
          <div className="w-1/2 h-3/4 p-4 bg-white shadow-lg rounded-lg mr-4">
            <img
              src="/assets/images/Song long diamond.png"
              alt="Song long Diamond"
              className="w-50 m-2"
            />
            <div className="w-fit mx-20">
              <h2 className="w-fit">Đặt hàng thành công</h2>
              <p className="w-fit">Mã đơn hàng #103448</p>
              <p className="w-fit">Cảm ơn bạn đã mua hàng!</p>
            </div>
            <div className="min-h-screen flex justify-center p-4">
              <Card className="w-5/6 h-fit p-4 bg-white shadow-lg rounded-lg">
                <div className="w-fit">
                  <div className="w-[450px]">
                    <CheckCircleOutlineTwoToneIcon
                      sx={{ fontSize: 50, color: "green" }}
                    />
                  </div>
                  <h3 className="w-fit">Thông tin đơn hàng</h3>
                  <p className="w-fit">
                    <strong>Thông tin giao hàng</strong>
                  </p>
                  <p className="w-fit">{orderData.order.cname}</p>
                  <p className="w-fit">{orderData.order.phone}</p>
                  <p className="w-fit">{orderData.order.address}</p>
                  <p className="w-fit">{orderData.order.email}</p>
                </div>
                <Divider />
                <div className="w-fit">
                  <p className="w-fit">
                    <strong>Phương thức thanh toán</strong>
                  </p>
                  <p className="w-fit">
                    {orderData.order.payment_method === "cod"
                      ? "Thanh toán khi giao hàng (COD)"
                      : "Chuyển khoản qua Paypal"}
                  </p>
                </div>
                <Divider />
                <div className="flex justify-between items-center">
                  <a href="/help">Cần hỗ trợ? Liên hệ chúng tôi</a>
                  <a href="/">
                    <Button type="primary">Tiếp tục mua hàng</Button>
                  </a>
                </div>
              </Card>
            </div>
          </div>
          <Card className="w-1/2 h-3/4 ml-4">
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.code}-${item.price}-${item.quantity}`}
                className="flex justify-between items-center mb-2"
              >
                <img src={item.image} alt="Product" className="w-16 h-16" />
                <div className="flex-1 ml-4">
                  <p className="w-44">{item.productName}</p>
                  <p className="text-gray-500 w-20">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <p>{item.price.toLocaleString()}đ</p>
              </div>
            ))}
            <div className="border-b my-4"></div>
            <div className="flex justify-between mb-2">
              <p>Tạm tính</p>
              <p>{finalPrice.toLocaleString()}đ</p>
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
              <p className="text-xl font-bold">
                {finalPrice.toLocaleString()}đ
              </p>
            </div>
          </Card>
        </div>
      </div>
    );
}
