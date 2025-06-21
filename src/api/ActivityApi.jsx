import axiosInstance from "./AxiosInstance"

export const getActivities = async () => {
    try{
        const response = await axiosInstance.get("/api/v1/activities");
        return response.data.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const getActivityById = async (id) => {
    try{
        const response = await axiosInstance.get(`/api/v1/activity/${id}`);
        return response.data.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}

export const getActivityByCategory = async (categoryId) => {
    try{
        const response = await axiosInstance.get(`/api/v1/activities-by-category/${categoryId}`);
        return response.data.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}

export const postCreateActivity = async (createActivityData) => {
    try{
        const response = await axiosInstance.post("/api/v1/create-activity", createActivityData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const postUpdateActivity = async (id, updateActivityData) => {
    try{
        const response = await axiosInstance.post(`/api/v1/update-activity/${id}`, updateActivityData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const delDeleteActivity = async (id) => {
    try{
        const response = await axiosInstance.delete(`/api/v1/delete-activity/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};