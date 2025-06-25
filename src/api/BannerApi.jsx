import axiosinstance from "./AxiosInstance";

export const getBanners = async () => {
    try {
        const response = await axiosinstance.get("/api/v1/banners");
        return response.data.data;
    } catch (error) {
        console.error(error);
    }
};

export const getBannerById = async (id) => {
    try {
        const response = await axiosinstance.get(`/api/v1/banner/${id}`);
        return response.data.data;
    } catch (error) {
        console.error(error);
    }
};

export const postCreateBanner = async (createBannerData) => {
    try {
        const response = await axiosinstance.post("/api/v1/create-banner", createBannerData);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const postUpdateBanner = async (id, updateBannerData) => {
    try {
        const response = await axiosinstance.post(`/api/v1/update-banner/${id}`, updateBannerData);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const delDeleteBanner = async (id) => {
    try {
        const response = await axiosinstance.delete(`/api/v1/delete-banner/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

