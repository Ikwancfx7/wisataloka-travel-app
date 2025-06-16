import axiosInstance from "./AxiosInstance";

export const UploadImage = async (image) => {
    try{
        const response = await axiosInstance.post("/api/v1/upload-image", image);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};
