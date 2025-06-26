import { useCart } from "../contexts/CartContext";
import { useEffect, useState } from "react";
import axiosInstance from "../api/AxiosInstance";
import { getPaymentMethods } from "../api/PaymentApi";
import { Link, useNavigate, useLocation } from "react-router-dom";


const Cart = () => {
  const { cartItems, loading, updateCart, removeFromCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const promoId = location.state?.promoId || null;
  const [promoCode, setPromoCode] = useState("");
  const [promo, setPromo] = useState(null);
  const [message, setMessage] = useState("");
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  
  const handleSelection = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }

    console.log("Selected items:", selectedItems);
  };
  
  const totalSelected = cartItems.reduce((total, item) => {
    if (selectedItems.includes(item.id)) {
      console.log("Item ID:", item.id, "Quantity:", item.quantity, "Price:", item.activity.price);
      return total + item.activity.price * item.quantity;
    }
    return total;
  }, 0);

  const selectedCartItems = cartItems.filter(item => selectedItems.includes(item.id));

  const totalPriceWithPromo = isPromoApplied && promo
  ? Math.max(0, totalSelected - promo.promo_discount_price)
  : totalSelected;
  
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

    if (selectedItems.length === 0) {
      setMessage("Pilih item terlebih dahulu untuk menerapkan promo.");
      return;
    }

    try {
      const response = await axiosInstance.get(`/api/v1/promo/${promoId}`);
      const promoData = response.data.data;
      
      if (totalSelected < promoData.minimum_claim_price) {
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

  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.id));
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedItems.length === 0) return;
    await Promise.all(selectedItems.map(removeFromCart)); 
    setSelectedItems([]);
  };

  const handleCheckout = async () => {
      try {
        const response = await getPaymentMethods();

        const currentSelectedItems = cartItems.filter(item =>
          selectedItems.includes(item.id)
        );

        console.log("Payment methods generated:", response.data);
        navigate("/checkout",{
        state: {
          promoId: isPromoApplied ? promo.id : null,
          selectedCartItems: currentSelectedItems
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    console.log("Selected items updated:", selectedCartItems);
  }, [selectedCartItems]);


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
    <div className="container mx-auto min-h-screen py-25">
        <h1 className="flex justify-center text-xl md:text-3xl font-bold">My Cart</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-5 lg:px-40 py-5 text-sm md:text-lg">
            <div className="md:col-span-2">
                <div className="space-y-2 w-full">
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
                    {cartItems.length > 0 && (
                      <div className="flex items-center justify-between bg-white p-2 rounded-lg mb-3 shadow-sm">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedItems.length === cartItems.length && cartItems.length > 0}
                            onChange={handleSelectAll}
                            className="h-5 w-5 cursor-pointer"
                          />
                          <span className="font-medium">Select All</span>
                        </div>

                        <button
                          onClick={handleDeleteSelected}
                          disabled={selectedItems.length === 0}
                          className={`px-4 py-1 rounded-lg text-sm border 
                            ${selectedItems.length
                              ? "border-red-500 text-red-500 hover:bg-red-50 cursor-pointer"
                              : "border-gray-300 text-gray-300 cursor-not-allowed"}`}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                    {cartItems.map((item) => (
                    <div key={item.id} className="flex flex-row items-center md:justify-between bg-white shadow-sm/20 rounded-lg p-2 gap-2 w-full">
                        <div className="flex flex-row justify-evenly items-center gap-2 w-full">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(item.id)}
                            onChange={() => handleSelection(item.id)}
                            className="form-checkbox h-5 w-5 text-blue-600 cursor-pointer"
                          />
                          <div className="flex flex-row justify-start items-center gap-2 w-full">
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
                              <h2 className="text-lg font-semibold line-clamp-1">{item.activity.title}</h2>
                              <p className="text-sm text-gray-500">Price: Rp {item.activity?.price ? item.activity.price.toLocaleString("id-ID"): "N/A"}</p>
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
                                className="px-2 py-1 bg-gray-50 rounded hover:cursor-pointer border border-gray-200"
                            >
                                -
                            </button>
                            <span className="px-3 py-1 bg-gray-50">
                              {item.quantity}
                            </span>
                            <button
                                onClick={() => handleQtyChange(item.id, item.quantity + 1)}
                                className="px-2 py-1 bg-gray-50 rounded hover:cursor-pointer border border-gray-200"
                            >
                                +
                            </button>
                          </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>

            <div className="p-4 flex flex-col justify-start rounded-lg shadow-md/20 gap-4 bg-white">
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
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer
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
