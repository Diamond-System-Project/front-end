import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Table, Button, message } from "antd";
import OrderDetailAPI from "../api/OrderDetailAPI";

export default function OrderDetails() {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await OrderDetailAPI.getOrderDetailsByOrderId(id);
        if (response.data.success) {
          const fetchedDetails = response.data.data;
          const formattedDetails = fetchedDetails.map((detail) => ({
            key: detail.productId,
            productName: detail.productId.productName,
            quantity: detail.quantity,
            totalPrice: detail.price?.toLocaleString() ?? "N/A",
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
      render: () => (
        <div className="flex space-x-2">
          <Button type="link">Gửi chứng nhận</Button>
          <Button type="link">Giấy bảo hành</Button>
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
    </div>
  );
}
