import axiosInstance from "./AxiosInstance";

export const getCategories = async () => {
    try {
        const response = await axiosInstance.get("/api/v1/categories");
        return response.data.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const getCategoryById = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/v1/category/${id}`);
        return response.data.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const postCreateCategory = async (data) => {
    try {
        const response = await axiosInstance.post("/api/v1/create-category", data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const postUpdateCategory = async (id, data) => {
    try {
        const response = await axiosInstance.post(`/api/v1/update-category/${id}`, data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const delDeleteCategory = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/v1/delete-category/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};