import { useCart } from "../contexts/CartContext";
import { useEffect, useState } from "react";
import axiosInstance from "../api/AxiosInstance";
// import PaymentMethod from "../components/PaymentMethod";
import { Link, useNavigate, useLocation } from "react-router-dom";
// import Checkout from "./Checkout";


const Cart = () => {
  const { cartItems, loading, updateCart, removeFromCart } = useCart();
  // const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [promoCode, setPromoCode] = useState("");
  const [promo, setPromo] = useState(null);
  const [message, setMessage] = useState("");
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const promoId = location.state?.promoId
  const [selectedItems, setSelectedItems] = useState([]);

  
  const handleSelection = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };
  
  const totalSelected = cartItems.reduce((total, item) => {
    if (selectedItems.includes(item.id)) {
      return total + item.activity.price * item.quantity;
    }
    return total;
  }, 0);

  const totalPriceWithPromo = isPromoApplied && promo
  ? Math.max(0, totalSelected - promo.promo_discount_price)
  : totalSelected;

  
  const totalHarga = cartItems.reduce((total, item) => {
    return total + item.activity.price * item.quantity;
  }, 0);
  
  const handleQtyChange = async (cartId, newQty) => {
    setIsPromoApplied(false);
    setMessage("");
    if (newQty < 1) return;
    console.log("cartId:", cartId ,"newQty:", newQty);
      await updateCart(cartId, newQty);
    };
  
  const handleApplyPromo = async () => {
    if (!promoId) {
      console.error("Promo ID tidak ditemukan di location.state");
      return;
    }
    try {
      const response = await axiosInstance.get(`/api/v1/promo/${promoId}`);
      const promoData = response.data.data;
      
      if (totalHarga < promoData.minimum_claim_price) {
        const errorMsg = (`Minimal belanja Rp ${promoData.minimum_claim_price.toLocaleString("id-ID")} untuk menggunakan promo ini.`);
        setMessage(errorMsg);
      } else {
        setPromo(promoData);
        setPromoCode(promoData.promo_code);
        setMessage("Promo applied.");
        setIsPromoApplied(true);
        console.log("Promo applied:", promoData);
      }
    } catch (error) {
      setMessage("Failed to apply promo.");
      console.error(error);
      setIsPromoApplied(false);
    }
  };

  const handleCheckout = async () => {
      try {
        const response = await axiosInstance.post("/api/v1/generate-payment-methods");
        console.log("Payment methods generated:", response.data);
        navigate("/checkout",{
        state: {
          promoId: isPromoApplied ? promo.id : null,
          totalPriceWithPromo
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
  
  // console.log("harga discount promo", promo.promo_discount_price);
  console.log("totalPriceWithPromo:", totalPriceWithPromo);

  useEffect(() => {
    if (location.state && location.state.promoCode) {
      const promoCodeFromPromoPage = location.state.promoCode || "";
      console.log("Promo diterima dari halaman promo:", promoCodeFromPromoPage);
      // kamu bisa setPromoCode atau langsung validasi API
      setPromoCode(promoCodeFromPromoPage);
    }
  }, [location.state]);

  if (loading) return <p className="text-center">cart loading...</p>;

  return (
    <div className="container mx-auto h-screen">
        <h1 className="flex justify-center text-xl font-semibold py-5 md:pt-20">MY CART</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10 lg:px-40 py-5 text-sm md:text-lg">
            <div className="md:col-span-2">
                <div className="space-y-6">
                    {cartItems.length === 0 && (
                      <div className="flex flex-col items-center justify-center h-full gap-2">
                        <div className="text-center text-gray-500">
                          Your cart is empty. Let's add some orders!
                        </div>
                        <Link to="/activities">
                          <button className="bg-blue-500 hover:bg-blue-600 hover:cursor-pointer text-white py-2 px-4 rounded">
                            Go to Explore
                          </button>
                        </Link>
                      </div>
                    )}
                    {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between border-b pb-4 gap-2">
                        <div className="flex flex-row items-center gap-2">

                          <input
                            type="checkbox"
                            checked={selectedItems.includes(item.id)}
                            onChange={() => handleSelection(item.id)}
                            className="form-checkbox h-5 w-5 text-blue-600"
                          />
                          <div className="flex flex-row gap-2 items-center">
                            <img
                              src={item.activity.imageUrls[0]}
                              alt={`Gambar ${item.activity.title}`}
                              className="w-24 h-24 object-cover rounded-lg"
                              onError={(e) => {
                                e.target.onerror = null; // cegah infinite loop
                                e.target.src = "/images/default-activity.jpg"; // fallback jika gagal load dari API
                              }}
                            />
                            <div>
                              <h2 className="text-lg font-semibold">{item.activity.title}</h2>
                              <p className="text-sm text-gray-500">Harga: Rp {item.activity?.price ? item.activity.price.toLocaleString("id-ID"): "N/A"}</p>
                              <p className="text-sm text-gray-500">
                                Subtotal: Rp {item.activity?.price 
                                  ? (item.activity.price * item.quantity).toLocaleString("id-ID")
                                  : "-"}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex flex-row items-center text-sm">
                            <button
                                onClick={() => handleQtyChange(item.id, item.quantity - 1)}
                                className="px-2 py-1 bg-gray50 rounded hover:cursor-pointer border border-gray-200"
                            >
                                -
                            </button>
                            <span className="px-3 py-1 bg-gray-50">
                              {item.quantity}
                            </span>
                            <button
                                onClick={() => handleQtyChange(item.id, item.quantity + 1)}
                                className="px-2 py-1 bg-gray50 rounded hover:cursor-pointer border border-gray-200"
                            >
                                +
                            </button>
                          </div>

                          <button
                              onClick={() => {removeFromCart(item.id)}}
                              className="text-sm ml-4 px-3 py-1 ring-1 ring-red-500 text-red-500 rounded hover:cursor-pointer"
                          >
                              Delete
                          </button>
                        </div>
                    </div>
                    ))}
                </div>
            </div>

            <div className="p-4 flex flex-col justify-start rounded-lg shadow-md/50 gap-4">
                <h2 className="text-xl font-semibold">Summary</h2>
                
                <div className="flex flex-col gap-2 text-sm">
                  <label htmlFor="promo" className="font-semibold">Kode Promo</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="promo"
                      className="border px-3 py-2 rounded w-full"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Masukkan kode promo"
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="bg-blue-500 text-white px-4 rounded-lg hover:bg-blue-600 hover:cursor-pointer transition duration-300 ease-in-out"
                    >
                      Apply
                    </button>
                  </div>
                  {message && (
                    <p className={`font-semibold mt-2 ${isPromoApplied ? "text-green-600" : "text-red-600"}`}>{message}</p>
                  )}
                </div>

                {isPromoApplied ? (
                  <>
                    <p>Total item terpilih: <span className="font-semibold">{selectedItems.length}</span></p>
                    <p>Total: <span className="font-bold">Rp {totalPriceWithPromo ? totalPriceWithPromo.toLocaleString("id-ID") : "0"}</span></p>
                  </>
                ):(
                  <>
                    <p>Total item terpilih: <span className="font-semibold">{selectedItems.length}</span></p>
                    <p>Total: <span className="font-bold">Rp {totalSelected ? totalSelected.toLocaleString("id-ID") : "0"}</span></p>
                  </>
                )}

                <button
                  onClick={handleCheckout}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg hover:cursor-pointer
                    transition duration-300 ease-in-out
                    disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={selectedItems.length === 0}
                >
                Checkout
                </button>
            </div>
        </div>
    </div>
  );
};

export default Cart;
