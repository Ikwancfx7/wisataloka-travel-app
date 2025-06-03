import axiosInstance from "./AxiosInstance";

const fetchPaymentMethods = async () => {
    try {
        const response = await axiosInstance.get("/api/v1/payment-methods");
        return response.data.data;
    } catch (error) {
        throw error.response?.data ?? { message: error.message || "Something went wrong" };
    }
};

export default fetchPaymentMethods;