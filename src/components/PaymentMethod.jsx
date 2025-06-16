import { useEffect, useState } from "react";
import { GetPaymentMethods } from "../api/PaymentApi";

const PaymentMethod = ({ selectedPaymentMethod, onChange }) => {
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const loadPaymentMethods = async () => {
            try {
                const methods = await GetPaymentMethods();
                setPaymentMethods(methods);
            } catch (error) {
                console.error("Error fetching payment methods:", error);
            } finally {
                setLoading(false);
            }
        };

        loadPaymentMethods();
    }, []);

    if (loading) return <p>Loading payment methods...</p>;

    if (paymentMethods.length === 0) {
        return <p>Tidak ada metode pembayaran tersedia saat ini.</p>;
    }

    return(
        <div className="space-y-3 my-4">
            <h3 className="text-lg font-semibold">Choose Payment Method:</h3>
            <div className="grid grid-cols-2 gap-4">
                {paymentMethods.map((method) => {
                    console.log("selectedPaymentMethod:", selectedPaymentMethod, "method.id:", method.id);
                    const isSelected = selectedPaymentMethod == method.id;
                    console.log("isSelected?", isSelected);
                    return (
                        <button
                            key={method.id}
                            onClick={() => onChange(method.id)}
                            className={`relative flex items-center gap-2 p-3 rounded ring-2 ring-blue-100 transition-all duration-200 hover:cursor-pointer
                                    ${isSelected ? "ring-2 ring-blue-200 bg-green-100" : "border-gray-300 hover:bg-green-100"}
                                `}
                        >
                            <img src={method.imageUrl} alt={`Metode ${method.name}`} className="w-10 h-10" />
                            <span>{method.name}</span>
                            {isSelected && (
                                <span className="text-blue-500 font-bold ml-auto">✓</span>
                            )}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default PaymentMethod;