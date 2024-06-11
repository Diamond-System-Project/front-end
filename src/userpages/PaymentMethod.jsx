import React, { useState } from "react";
import { Button, Divider, Radio } from "antd";
import { Typography } from "@mui/material";
import { Card } from "antd";
import { Input } from "antd";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import AccountBalanceTwoToneIcon from "@mui/icons-material/AccountBalanceTwoTone";
// import { Link } from 'react-router-dom';

export default function PaymentMethod() {
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <div className="min-h-screen flex justify-center p-4">
      <div className="w-5/6 flex ">
        <div className="w-1/2 p-4 bg-white shadow-lg rounded-lg mr-4">
          <img
            src="/assets/images/Song long diamond.png"
            alt="Song long Diamond"
            className="w-50 m-2"
          />

          <Typography variant="h6" className="mb-4 w-fit ">
            Phương thức vận chuyển
          </Typography>
          <Radio.Group value="delivery" className="mb-4">
            <div className="flex justify-between items-center border p-2 rounded w-[700px] h-14">
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
            <div className="flex justify-between items-center border p-2 rounded w-[700px] h-14">
              <Radio value="cod">
                <LocalShippingOutlinedIcon />
                Thanh toán khi giao hàng (COD)
              </Radio>
            </div>
            <div className="flex justify-between items-center border p-2 rounded w-[700px] h-14 my-4">
              <Radio value="bank">
                <AccountBalanceTwoToneIcon />
                Chuyển khoản qua Paypal
              </Radio>
            </div>
          </Radio.Group>
          <div className="flex justify-between">
            <Button type="link">Giỏ hàng</Button>
            <Button
              type="primary"
              className="bg-blue-500 text-white w-[400px] h-10 mr-3"
            >
              Hoàn tất đơn hàng
            </Button>
          </div>
        </div>
        <Card className="w-1/2 ml-4">
          <div className="flex justify-between items-center mb-2">
            <img
              src="https://via.placeholder.com/50"
              alt="Product"
              className="w-16 h-16"
            />
            <div className="flex-1 ml-4">
              <p className="w-44">
                Kim cương viên LUCKY STAR 4.4ly H VS1 EX M2B47001
              </p>
              <p className="text-gray-500 w-20">H / VS1 / EX</p>
            </div>
            <p>27,034,000₫</p>
          </div>
          <div className="border-b my-4"></div>
          <div className="flex justify-between mb-2">
            <Input
              type="text"
              placeholder="Mã giảm giá"
              className="w-2/3 p-2 border rounded mr-2"
            />
            <Button className="w-1/3 p-2 bg-blue-500 rounded h-10 text-white">
              Áp dụng
            </Button>
          </div>
          <div className="border-b my-4"></div>
          <div className="flex justify-between mb-2">
            <p>Tạm tính</p>
            <p>27,034,000₫</p>
          </div>
          <div className="flex justify-between mb-2">
            <p>Phí vận chuyển</p>
            <p>-</p>
          </div>
          <div className="border-b my-4"></div>
          <div className="flex justify-between mb-2">
            <p className="text-xl font-bold">Tổng cộng</p>
            <p className="text-xl font-bold">27,034,000₫</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
