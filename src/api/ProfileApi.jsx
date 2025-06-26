import axiosInstance from "./AxiosInstance";

export const getloggedUser = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/user");
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/all-user");
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

export const postUpdateProfile = async (formData) => {
  try {
    const response = await axiosInstance.post("/api/v1/update-profile", formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const postUpdateUserRole = async (id, data) => {
  try {
    const response = await axiosInstance.post(`/api/v1/update-user-role/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
