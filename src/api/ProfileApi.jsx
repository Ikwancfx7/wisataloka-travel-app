import axiosInstance from "./AxiosInstance";

export const updateProfile = async (formData) => {
  const res = await axiosInstance.post("/api/v1/update-profile", formData);
  return res;
};
