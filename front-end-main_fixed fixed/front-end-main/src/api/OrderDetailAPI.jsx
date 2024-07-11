import axiosClient from "./axiosClient";

const OrderDetailAPI = {
  getOrderDetailsByOrderId: (orderId) => {
    return axiosClient.get(`/order_detail/order/${orderId}`);
  },
};

export default OrderDetailAPI;
