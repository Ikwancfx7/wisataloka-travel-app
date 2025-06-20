import axiosInstance from "./AxiosInstance";

export const getPromos = async () => {
    try {
        const response = await axiosInstance.get("/api/v1/promos");
        return response.data.data;
    } catch (error) {
        console.error(error);
    }
};

export const getPromoById = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/v1/promo/${id}`);
        return response.data.data;
    } catch (error) {
        console.error(error);
    }
};

export const postCreatePromo = async (data) => {
    try {
        const response = await axiosInstance.post("/api/v1/create-promo", data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const postUpdatePromo = async (id, data) => {
    try {
        const response = await axiosInstance.post(`/api/v1/update-promo/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const delDeletePromo = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/v1/delete-promo/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};