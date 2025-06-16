import axiosInstance from "./AxiosInstance"

export const GetActivities = async () => {
    try{
        const response = await axiosInstance.get("/api/v1/activities");
        return response.data.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const GetActivityById = async (id) => {
    try{
        const response = await axiosInstance.get(`/api/v1/activity/${id}`);
        return response.data.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}

export const PostCreateActivity = async (createActivityData) => {
    try{
        const response = await axiosInstance.post("/api/v1/create-activity", createActivityData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const PostUpdateActivity = async (id, updateActivityData) => {
    try{
        const response = await axiosInstance.post(`/api/v1/update-activity/${id}`, updateActivityData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const DelDeleteActivity = async (id) => {
    try{
        const response = await axiosInstance.delete(`/api/v1/delete-activity/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};