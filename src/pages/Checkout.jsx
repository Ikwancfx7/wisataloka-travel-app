import { useState } from "react";
import PaymentMethod from "../components/PaymentMethod";
import axiosInstance from "../api/AxiosInstance";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const { cartItems } = useCart();
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
    const navigate = useNavigate();
    
    const handleSubmitTransaction = async () => {
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

  if(cartItems.length === 0) return navigate("/");

    return (
        <div className="p-4">
            <h1 className="flex justify-center text-xl">Checkout</h1>
            <div className="space-y-6">
                {cartItems.length === 0 && <p className="text-center">Empty</p>}
                {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b pb-4">
                    <div>
                    <h2 className="text-lg font-semibold">{item.activity.title}</h2>
                    <p className="text-sm text-gray-500">Harga: Rp {item.activity.price}</p>
                    <p className="text-sm text-gray-500">Subtotal: Rp {item.activity.price * item.quantity}</p>
                    </div>
                </div>
                ))}
                <div>
                    <h2 className="text-lg font-semibold">Total Harga:</h2>
                    <p className="text-lg font-semibold">Rp {totalHarga}</p>
                </div>
            </div>
            <PaymentMethod setSelectedPaymentMethod={setSelectedPaymentMethod} onChange={setSelectedPaymentMethod} />
            <button 
                onClick={handleSubmitTransaction}
                className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 hover:cursor-pointer"
            >
                Checkout
            </button>
        </div>
    );
}

export default Checkout;