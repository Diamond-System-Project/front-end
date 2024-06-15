import axiosClient from "./axiosClient";

const OrderAPI = {
  getAllOrders: () => {
    const url = `/order/all`;
    return axiosClient.get(url);
  },
  getOrderById: (id) => {
    const url = `/order/${id}`;
    return axiosClient.get(url);
  }
};

export default OrderAPI;
