import axiosClient from "./axiosClient";
const AuthAPI = {
  Login: (email, password) => {
    const url = `/user/login`;
    const data = { email, password };
    return axiosClient.post(url, data);
  },
  Register: (fullName, password,phone, email, gender, dob) => {
    const url = `/user/register`;
    const data = {fullName, password,phone, email, gender, dob };
    return axiosClient.post(url, data);
  } 
};
export default AuthAPI;
