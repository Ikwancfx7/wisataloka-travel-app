import { useState } from "react";
import PaymentMethod from "../components/PaymentMethod";
import axiosInstance from "../api/AxiosInstance";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
    const navigate = useNavigate();
    const { cartItems, loading } = useCart();
    
    const handleSubmitTransaction = async () => {
        if (!selectedPaymentMethod) {
            alert("Pilih metode pembayaran terlebih dahulu.");
            return;
        }

        try {
            const res = await axiosInstance.post("/api/v1/create-transaction", {
            cartIds: cartItems.map(item => item.id),
            paymentMethodId: selectedPaymentMethod,
            // data lain jika perlu
            });
            // redirect ke halaman detail transaksi
            navigate(`/transaction/${res.data.data.id}`);
        } catch (error) {
            console.error(error);
        }
    };

    const totalHarga = cartItems.reduce((total, item) => {
    return total + item.activity.price * item.quantity;
  }, 0);

  if (!loading && cartItems.length === 0) {
  navigate("/");
  return null;
}

    return (
        <div className="py-5 px-40 min-h-screen">
            <h1 className="flex justify-center text-2xl">Checkout</h1>
            <div className="space-y-6 mt-5">
                {cartItems.length === 0 && <p className="text-center">Empty</p>}
                {cartItems.map((item) => (
                <div key={item.id} className="flex flex-row justify-between items-center gap-2">
                    <h2 className="text-lg font-semibold">{item.activity.title}</h2>
                    <p className="text-sm md:text-lg">Price: Rp {item.activity.price}</p>
                    <p className="text-sm md:text-lg">Quantity: {item.quantity}</p>
                    <p className="text-sm md:text-lg">Subtotal: Rp {item.activity.price * item.quantity}</p>
                </div>
                ))}
                <div className="flex flex-row justify-end items-center gap-1">
                    <p className="text-lg">Total Order({cartItems.reduce((total, item) => total + item.quantity, 0)}):</p>
                    <p className="text-xl font-semibold text-green-600"> Rp {totalHarga.toLocaleString("id-ID")}</p>
                </div>
            </div>
            <PaymentMethod selectedPaymentMethod={selectedPaymentMethod} onChange={setSelectedPaymentMethod} />
            <button 
                onClick={handleSubmitTransaction}
                className={`mt-4 w-full px-4 py-2 rounded font-semibold ${selectedPaymentMethod ? "bg-green-300 hover:bg-green-400 text-white hover:cursor-pointer" : "bg-gray-200 cursor-not-allowed"}`}
                disabled={!selectedPaymentMethod}
            >
                Create Order
            </button>
        </div>
    );
}

export default Checkout;