import axiosInstance from "./AxiosInstance";

export const GetPaymentMethods = async () => {
    try {
        const response = await axiosInstance.get("/api/v1/payment-methods");
        return response.data.data;
    } catch (error) {
        throw error.response?.data ?? { message: error.message || "Something went wrong" };
    }
};

export const getMyTransactions = async () => {
    try {
        const response = await axiosInstance.get("/api/v1/my-transactions");
        return response.data.data;
    } catch (error) {
        throw error.response?.data ?? { message: error.message || "Something went wrong" };
    }
};

export const getTransactionById = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/v1/transaction/${id}`);
        return response.data.data;
    } catch (error) {
        throw error.response?.data ?? { message: error.message || "Something went wrong" };
    }
};

export const GetAllTransactions = async () => {
    try {
        const response = await axiosInstance.get("/api/v1/all-transactions");
        return response.data.data;
    } catch (error) {
        throw error.response?.data ?? { message: error.message || "Something went wrong" };
    }
};

export const CreateTransaction = async (data) => {
    try {
        const response = await axiosInstance.post("/api/v1/create-transaction", data);
        return response.data.data;
    } catch (error) {
        throw error.response?.data ?? { message: error.message || "Something went wrong" };
    }
};

export const CancelTransaction = async (id) => {
    try {
        const response = await axiosInstance.post(`/api/v1/cancel-transaction/${id}`);
        return response.data.data;
    } catch (error) {
        throw error.response?.data ?? { message: error.message || "Something went wrong" };
    }
};

export const UpdateTransactionProofPayment = async (id, data) => {
    try {
        const response = await axiosInstance.post(`/api/v1/update-transaction-proof-payment/${id}`, data);
        return response.data.data;
    } catch (error) {
        throw error.response?.data ?? { message: error.message || "Something went wrong" };
    }
}

export const UpdateTransactionStatus = async (id, data) => {
    try {
        const response = await axiosInstance.post(`/api/v1/update-transaction-status/${id}`, data);
        return response.data.data;
    } catch (error) {
        throw error.response?.data ?? { message: error.message || "Something went wrong" };
    }
}