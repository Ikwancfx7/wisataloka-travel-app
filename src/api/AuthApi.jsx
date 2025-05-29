import axiosInstance from "./AxiosInstance";

export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post("/api/v1/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/api/v1/register", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axiosInstance.post("/api/v1/logout");
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
