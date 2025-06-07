import axiosInstance from "./AxiosInstance";

export const fetchPaymentMethods = async () => {
    try {
        const response = await axiosInstance.get("/api/v1/payment-methods");
        return response.data.data;
    } catch (error) {
        throw error.response?.data ?? { message: error.message || "Something went wrong" };
    }
};

export const fetchMyTransactions = async () => {
    try {
        const response = await axiosInstance.get("/api/v1/my-transactions");
        return response.data.data;
    } catch (error) {
        throw error.response?.data ?? { message: error.message || "Something went wrong" };
    }
};