import axiosClient from "./axiosClient";

const AuthAPI = {
  Login: (email, password) => {
    const url = `/user/login`;
    const data = { email, password };
    return axiosClient.post(url, data);
  },
  Register: (fullName, password, phone, email, gender, dob) => {
    const url = `/user/register`;
    const data = { fullName, password, phone, email, gender, dob };
    return axiosClient.post(url, data);
  },
  getUserById: (id) => {
    const url = `/user/${id}`;
    const token = localStorage.getItem("token");
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  updateUser: (id, data) => {
    const url = `/user/update/${id}`;
    const token = localStorage.getItem("token");
    return axiosClient.put(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default AuthAPI;
