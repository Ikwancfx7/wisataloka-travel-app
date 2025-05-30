// src/pages/CartPage.jsx
import { useCart } from "../contexts/CartContext";
import axiosInstance from "../api/AxiosInstance";

const Cart = () => {
  const { cartItems, loading, updateCart, removeFromCart } = useCart();

  const handleQtyChange = (cartId, newQty) => {
    if (newQty < 1) return;
    updateCart(cartId, newQty);
  };

  if (loading) return <p className="text-center">cart loading...</p>;

//   if (cartItems.length === 0) {
//     return <p className="text-center">Empty Cart</p>;
//   }

  const totalHarga = cartItems.reduce((total, item) => {
    return total + item.activity.price * item.qty;
  }, 0);

  const handleCheckout = async () => {
    const cartIds = cartItems.map((item) => item.id);
    try {
      const response = await axiosInstance.post("/api/v1/create-transaction", {
        cart_ids: cartIds,
        payment_method: "manual", // atau bank_transfer kalau disediakan
      });

      const transactionId = response.data.data.id;
      window.location.href = `/transaction/${transactionId}`; // arahkan ke halaman detail transaksi
    } catch (error) {
      console.error("Gagal melakukan checkout:", error.response?.data || error.message);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-40 py-8">
        <div className="md:col-span-2">
            {/* <h1 className="text-2xl font-bold mb-6">Cart</h1> */}
            
            {/* <div className="space-y-6">
                <div  className="flex items-center justify-between border-b pb-4">
                    <div>
                    <h2 className="text-lg font-semibold">Malaysia</h2>
                    <p className="text-sm text-gray-500">Harga: Rp 1000000</p>
                    <p className="text-sm text-gray-500">Subtotal: Rp 1000000</p>
                    </div>

                    <div className="flex items-center gap-2">
                    <button
                        className="px-3 py-1 bg-gray-200 rounded"
                    >
                        -
                    </button>
                    <span>1</span>
                    <button
                        className="px-3 py-1 bg-gray-200 rounded"
                    >
                        +
                    </button>

                    <button
                        className="ml-4 px-3 py-1 bg-red-500 text-white rounded"
                    >
                        Delete
                    </button>
                    </div>
                </div>
                <div  className="flex items-center justify-between border-b pb-4">
                    <div>
                    <h2 className="text-lg font-semibold">Bali</h2>
                    <p className="text-sm text-gray-500">Harga: Rp 1500000</p>
                    <p className="text-sm text-gray-500">Subtotal: Rp 1500000</p>
                    </div>

                    <div className="flex items-center gap-2">
                    <button
                        className="px-3 py-1 bg-gray-200 rounded"
                    >
                        -
                    </button>
                    <span>1</span>
                    <button
                        className="px-3 py-1 bg-gray-200 rounded"
                    >
                        +
                    </button>

                    <button
                        className="ml-4 px-3 py-1 bg-red-500 text-white rounded"
                    >
                        Delete
                    </button>
                    </div>
                </div>
            </div> */}

            <div className="space-y-6">
                {cartItems.length === 0 && <p className="text-center">Empty Cart</p>}
                {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b pb-4">
                    <div>
                    <h2 className="text-lg font-semibold">{item.activity.name}</h2>
                    <p className="text-sm text-gray-500">Harga: Rp {item.activity.price}</p>
                    <p className="text-sm text-gray-500">Subtotal: Rp {item.activity.price * item.qty}</p>
                    </div>

                    <div className="flex items-center gap-2">
                    <button
                        onClick={() => handleQtyChange(item.id, item.qty - 1)}
                        className="px-3 py-1 bg-gray-200 rounded"
                    >
                        -
                    </button>
                    <span>{item.qty}</span>
                    <button
                        onClick={() => handleQtyChange(item.id, item.qty + 1)}
                        className="px-3 py-1 bg-gray-200 rounded"
                    >
                        +
                    </button>

                    <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-4 px-3 py-1 bg-red-500 text-white rounded"
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
            <p>Total: <span className="font-bold">Rp {totalHarga}</span></p>
            <button
            onClick={handleCheckout}
            className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 hover:cursor-pointer"
            disabled={cartItems.length === 0}
            >
            Checkout
            </button>
        </div>
        {/* <div className="p-4 border rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">Ringkasan</h2>
            <p>Total: <span className="font-bold">Rp 2500000</span></p>
            <button
            onClick={handleCheckout}
            className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
            Checkout
            </button>
        </div> */}
    </div>
  );
};

export default Cart;
