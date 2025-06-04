import { useCart } from "../contexts/CartContext";
// import { useState } from "react";
import axiosInstance from "../api/AxiosInstance";
import PaymentMethod from "../components/PaymentMethod";
import { useNavigate } from "react-router-dom";
import Checkout from "./Checkout";
import { toast } from "react-toastify";


const Cart = () => {
    const { cartItems, loading, updateCart, removeFromCart } = useCart();
    // const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
    const navigate = useNavigate();

  const handleQtyChange = async (cartId, newQty) => {
    if (newQty < 1) return;
      console.log("cartId:", cartId ,"newQty:", newQty);
      await updateCart(cartId, newQty);
  };

  if (loading) return <p className="text-center">cart loading...</p>;

    const totalHarga = cartItems.reduce((total, item) => {
    return total + item.activity.price * item.quantity;
  }, 0);

const handleCheckout = async () => {
  try {
    const response = await axiosInstance.post("/api/v1/generate-payment-methods");
    console.log("Payment methods generated:", response.data);
    navigate("/checkout");
  } catch (error) {
    console.error(error);
  }
}
  
  // const handleCheckout = async () => {
  //   const cartIds = cartItems.map((item) => item.id);
  //   try {
  //     const response = await axiosInstance.post("/api/v1/create-transaction", {
  //       cartIds: cartIds,
  //       paymentMethodId: selectedPaymentMethod, // atau bank_transfer kalau disediakan
  //     });

  //     const transactionId = response.data.data.id;
  //     window.location.href = `/transaction/${transactionId}`; // arahkan ke halaman detail transaksi
  //   } catch (error) {
  //     console.error("Gagal melakukan checkout:", error.response?.data || error.message);
  //   }
  // };

  return (
    <div className="h-screen">
        <h1 className="flex justify-center text-xl font-semibold py-5">MY CART</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10 lg:px-40 py-5 text-sm md:text-lg">
            <div className="md:col-span-2">
                <div className="space-y-6">
                    {cartItems.length === 0 && (
                      <div className="text-center text-gray-500">
                        Keranjangmu masih kosong. Yuk, tambah aktivitas!
                      </div>
                    )}
                    {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between border-b pb-4">
                        <div>
                        <h2 className="text-lg font-semibold">{item.activity.title}</h2>
                        <p className="text-sm text-gray-500">Harga: Rp {item.activity?.price ? item.activity.price.toLocaleString("id-ID"): "N/A"}</p>
                        <p className="text-sm text-gray-500">
                          Subtotal: Rp {item.activity?.price 
                            ? (item.activity.price * item.quantity).toLocaleString("id-ID")
                            : "-"}
                        </p>
                        </div>

                        <div className="flex items-center gap-2">
                        <div className="flex flex-row items-center text-sm">
                          <button
                              onClick={() => handleQtyChange(item.id, item.quantity - 1)}
                              className="px-3 py-1 bg-gray50 rounded hover:cursor-pointer border border-gray-200"
                          >
                              -
                          </button>
                          <span className="px-3 py-1 bg-gray50 border border-gray-200">
                            {item.quantity}
                          </span>
                          <button
                              onClick={() => handleQtyChange(item.id, item.quantity + 1)}
                              className="px-3 py-1 bg-gray50 rounded hover:cursor-pointer border border-gray-200"
                          >
                              +
                          </button>
                        </div>

                        <button
                            onClick={() => {removeFromCart(item.id); toast.success("Item removed from cart");}}
                            className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:cursor-pointer"
                        >
                            Delete
                        </button>
                        </div>
                    </div>
                    ))}
                </div>
            </div>

            <div className="p-4 border rounded shadow-md">
                <h2 className="text-xl font-semibold mb-4">Summary</h2>
                <p>Total: <span className="font-bold">Rp {totalHarga ? totalHarga.toLocaleString("id-ID") : "0"}</span></p>
                <button
                onClick={handleCheckout}
                className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue- hover:cursor-pointer"
                disabled={cartItems.length === 0}
                >
                Checkout
                </button>
            </div>
        </div>
    </div>
  );
};

export default Cart;
