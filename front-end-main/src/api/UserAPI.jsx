import axiosClient from "./axiosClient";
const UserAPI = {
  users: () => {
    const url = `user/alluser`;
    return axiosClient.get(url);
  },
  getUserById: (userId) => {
    const url = `/user/${userId}`; 
    return axiosClient.get(url);
  },
  updateUser: async (id, values) => {
    const url = `/user/update/${id}`; 
    try {
      const response = await axiosClient.put(url, values);
      return response.data; 
    } catch (error) {
      throw new Error(error.response.data.message || "Failed to update user");
    }
  },
};

export default UserAPI;
