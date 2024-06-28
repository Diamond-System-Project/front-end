import axiosClient from "./axiosClient";

const GetUserByRoleAPI = {
  getAllDeliveryStaff: () => {
    const roleId = 4;
    const accessToken = localStorage.getItem("accessToken");
    return axiosClient.get(`user/role/${roleId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}` // Add Bearer Token to headers
      }
    });
  },
  assignOrderToDelivery: (orderId, deliveryId) => {
    const accessToken = localStorage.getItem("accessToken");
    return axiosClient.put('order/assign', {
      orderId: orderId,
      deliveryId: deliveryId
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}` // Add Bearer Token to headers
      }
    });
  }
};

export default GetUserByRoleAPI;
