import { useState, useEffect } from "react";
import PaymentMethod from "../components/PaymentMethod";
import { createTransaction, getMyTransactions } from "../api/PaymentApi";
import { getPromoById } from "../api/PromoApi";
import { useCart } from "../contexts/CartContext";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Checkout = () => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const { loading, fetchCart } = useCart();

    const { selectedCartItems = [], promoId = null } = location.state || {};

    const [promo, setPromo] = useState(null);
    const [discount, setDiscount] = useState(0);

    console.log("Selected cart items:", selectedCartItems);

    useEffect(() => {
        if (!loading && (!selectedCartItems || selectedCartItems.length === 0)) {
            navigate("/cart");
        }
    },  [loading, selectedCartItems, navigate]);

    const totalPrice = selectedCartItems.reduce((total, item) => {
        return total + item.activity.price * item.quantity;
    }, 0);

    const totalPriceFinal = Math.max(0, totalPrice - discount);
    
    const handleSubmitTransaction = async () => {
        if (!selectedPaymentMethod) {
            toast.error("Please select a payment method", { autoClose: 1000 });
            return;
        }

        try {
            const payload = {
                cartIds: selectedCartItems.map(item => item.id),
                paymentMethodId: selectedPaymentMethod,
            }

            await createTransaction(payload);

            const res = await getMyTransactions();

            const sortedTransactions = res.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );

            const latestTransaction = sortedTransactions[0];

            if (latestTransaction && latestTransaction.id) {
                navigate(`/transaction/${latestTransaction.id}`);
            } else {
                console.error("New transaction not found.");
            }

            fetchCart();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchPromo = async () => {
            if (!promoId) return;

            try {
                const response = await getPromoById(promoId);
                const promoData = response;
                setPromo(promoData);
                console.log("Promo data:", promoData);
                setDiscount(promoData.promo_discount_price || 0);
            } catch (error) {
                console.error("Failed to fetch promo:", error);
            }
        };

        fetchPromo();
    }, [promoId]);

    

    return (
        <div className="bg-gray-50 py-25">
            <div className="container mx-auto flex flex-col px-5 md:px-30 lg:px-50 min-h-screen">
                <h1 className="flex justify-center text-2xl md:text-3xl italic font-semibold">Checkout</h1>
                <div className="space-y-6 text-xs mt-5">
                    {selectedCartItems.length === 0 && <p className="text-center">Empty</p>}
                    {selectedCartItems.map((item) => {
                        return (
                            <div key={item.id} className="flex flex-col lg:flex-row lg:justify-between gap-2 w-full">
                                <div className="flex flex-row gap-2 md:w-3/4 cursor-pointer">
                                    <img 
                                        src={item.activity.imageUrls[0] || "/images/default-activity.jpg"} 
                                        alt="gambar activity"
                                        className="w-25 h-25 object-cover rounded-lg"
                                        onError={(e) => {
                                            e.target.onerror = null; // cegah infinite loop
                                            e.target.src = "/images/default-activity.jpg"; // fallback jika gagal load dari API
                                        }}
                                    />
                                    <div className="flex flex-col justify-between w-full">
                                        <h2 className="text-xl font-semibold">{item.activity.title}</h2>
                                        <div className="flex flex-row justify-between items-center text-sm md:text-lg w-full">
                                            <p className="text-green-700 font-semibold">Rp {item.activity.price.toLocaleString("id-ID")}</p>
                                            <p>x {item.quantity}</p>
                                        </div>
                                    </div>
                                </div>
        
                                <div className="flex flex-row justify-between md:justify-end md:w-1/4 items-center text-sm md:text-lg font-semibold text-green-600">
                                    <p className="block md:hidden">Subtotal:</p>
                                    <p>Rp {(item.activity.price * item.quantity).toLocaleString("id-ID")}</p>
                                </div>
                            </div>
                        )
                    }
                    )}
                    <div className="flex flex-col gap-1">
                        <p className="text-lg font-semibold">Price Detile:</p>
                        <div className="flex flex-row justify-between items-center">
                            <p className="">Subtotal Order ({selectedCartItems.reduce((total, item) => total + item.quantity, 0)}):</p>
                            <p className=""> Rp {totalPrice.toLocaleString("id-ID")}</p>
                        </div>
                        <div className="flex flex-row justify-between items-center">
                            <p>Discount Promo ({promo?.title}) :</p>
                            <p className="text-red-600">-Rp {discount.toLocaleString("id-ID")}</p>
                        </div>
                        <div className="flex flex-row justify-between items-center">
                            <p className="font-semibold">Total Payment:</p>
                            <p className="text-lg md:text-xl font-semibold text-green-600">Rp {totalPriceFinal.toLocaleString("id-ID")}</p>
                        </div>
                    </div>
                </div>
                <PaymentMethod selectedPaymentMethod={selectedPaymentMethod} onChange={setSelectedPaymentMethod} />
                <button 
                    onClick={handleSubmitTransaction}
                    className="mt-4 w-full px-4 py-2 rounded font-semibold bg-green-500 hover:bg-green-600 text-white hover:cursor-pointer
                        disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!selectedPaymentMethod}
                >
                    Create Order
                </button>
            </div>
        </div>
    );
}

export default Checkout;