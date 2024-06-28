import axiosClient from "./axiosClient";

const VoucherAPI = {
  getVoucherById: (id) => {
    return axiosClient.get(`/voucher/${id}`);
  }
};

export default VoucherAPI;
