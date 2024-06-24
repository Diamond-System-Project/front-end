import axiosClient from "./axiosClient";

const GetUserByRoleAPI = {
  getAllDeliveryStaff: () => {
    const roleId = 4;
    return axiosClient.get(`/role/${roleId}`);
  },
};

export default GetUserByRoleAPI;
